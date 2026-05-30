import { apiFetch } from "@/lib/api-client";
import { SURVEY_QUESTIONS } from "@/app/talent/survey/SurveyQuestion";

type SurveyAnswers = Record<number, number>;

type SurveyProfileInput = {
  height: string;
  experience: string;
  tiktokFollowers: string;
  instagramFollowers: string;
  facebookFollowers: string;
  youtubeFollowers: string;
};

type SurveyCalculateResponse = {
  tier: "S" | "A" | "B" | "C";
  overall_score: number;
  criteria_scores: Record<string, number>;
};

function numberValue(value: string) {
  return Number.parseInt(value, 10) || 0;
}

function totalFollowers(input: SurveyProfileInput) {
  return (
    numberValue(input.tiktokFollowers) +
    numberValue(input.instagramFollowers) +
    numberValue(input.facebookFollowers) +
    numberValue(input.youtubeFollowers)
  );
}

export async function submitTalentSurvey(input: SurveyProfileInput, answers: SurveyAnswers) {
  await apiFetch("/survey/submit", {
    method: "POST",
    body: JSON.stringify({
      section: "A",
      answers: [
        { question_code: "A1", answer_value: [numberValue(input.height)] },
        { question_code: "B1", answer_value: [numberValue(input.experience)] },
        { question_code: "C1", answer_value: [totalFollowers(input)] },
      ],
    }),
  });

  await apiFetch("/survey/submit", {
    method: "POST",
    body: JSON.stringify({
      section: "S",
      answers: SURVEY_QUESTIONS.filter((question) => answers[question.id] !== undefined).map((question) => {
        const answerIndex = answers[question.id];
        const option = question.options[answerIndex];

        return {
          question_code: `Q${question.id}`,
          answer_value: [
            {
              option_index: answerIndex,
              group: option.group,
              text: option.text,
            },
          ],
        };
      }),
    }),
  });

  return apiFetch<SurveyCalculateResponse>("/survey/calculate", {
    method: "POST",
  });
}
