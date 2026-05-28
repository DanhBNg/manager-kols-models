import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProgressBar from '@/Components/Survey/ProgressBar';
import QuestionCard from '@/Components/Survey/QuestionCard';
import { Section, SurveySection, SurveyAnswer } from '@/types/survey';
import axios from 'axios';

const surveyData: SurveySection[] = [
    {
        section: 'A',
        title: 'Physical Attributes',
        description: 'Tell us about your physical characteristics',
        questions: [
            { code: 'A1', text: 'Height (cm)', type: 'number', required: true, min: 140, max: 200 },
            { code: 'A2', text: 'Weight (kg)', type: 'number', required: true, min: 35, max: 100 },
            {
                code: 'A3',
                text: 'Facial Features',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
            {
                code: 'A4',
                text: 'Skin Quality',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
            {
                code: 'A5',
                text: 'Body Proportions',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
            {
                code: 'A6',
                text: 'Hair Quality',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
            {
                code: 'A7',
                text: 'Posture',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
            {
                code: 'A8',
                text: 'Overall Appearance',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
        ],
    },
    {
        section: 'B',
        title: 'Skills & Experience',
        description: 'Share your professional background',
        questions: [
            { code: 'B1', text: 'Years of Modeling Experience', type: 'number', required: true, min: 0, max: 50 },
            { code: 'B2', text: 'Years of Pageant Experience', type: 'number', required: true, min: 0, max: 50 },
            {
                code: 'B3',
                text: 'Special Skills',
                type: 'multiselect',
                required: false,
                options: [
                    { value: 'dancing', label: 'Dancing' },
                    { value: 'singing', label: 'Singing' },
                    { value: 'acting', label: 'Acting' },
                    { value: 'sports', label: 'Sports' },
                    { value: 'music', label: 'Music Instruments' },
                    { value: 'art', label: 'Art & Design' },
                ],
            },
            {
                code: 'B4',
                text: 'Public Speaking Skills',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                    { value: 'poor', label: 'Poor' },
                ],
            },
            { code: 'B5', text: 'Notable Achievements', type: 'text', required: false, placeholder: 'Awards, titles, recognitions...' },
            {
                code: 'B6',
                text: 'Education Level',
                type: 'select',
                required: true,
                options: [
                    { value: 'high_school', label: 'High School' },
                    { value: 'bachelor', label: 'Bachelor\'s Degree' },
                    { value: 'master', label: 'Master\'s Degree' },
                    { value: 'phd', label: 'PhD' },
                ],
            },
            { code: 'B7', text: 'Professional Experience (years)', type: 'number', required: true, min: 0, max: 50 },
            {
                code: 'B8',
                text: 'Language Skills',
                type: 'multiselect',
                required: true,
                options: [
                    { value: 'vietnamese', label: 'Vietnamese' },
                    { value: 'english', label: 'English' },
                    { value: 'french', label: 'French' },
                    { value: 'chinese', label: 'Chinese' },
                    { value: 'japanese', label: 'Japanese' },
                    { value: 'korean', label: 'Korean' },
                ],
            },
        ],
    },
    {
        section: 'C',
        title: 'Social Media & Personality',
        description: 'Your online presence and character',
        questions: [
            { code: 'C1', text: 'Instagram Handle', type: 'text', required: false, placeholder: '@username' },
            { code: 'C2', text: 'Total Followers (all platforms)', type: 'number', required: true, min: 0 },
            { code: 'C3', text: 'Average Engagement Rate (%)', type: 'number', required: false, min: 0, max: 100 },
            {
                code: 'C4',
                text: 'Personality Traits',
                type: 'multiselect',
                required: true,
                options: [
                    { value: 'confident', label: 'Confident' },
                    { value: 'friendly', label: 'Friendly' },
                    { value: 'ambitious', label: 'Ambitious' },
                    { value: 'creative', label: 'Creative' },
                    { value: 'empathetic', label: 'Empathetic' },
                    { value: 'resilient', label: 'Resilient' },
                ],
            },
            {
                code: 'C5',
                text: 'Confidence Level',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Very Confident' },
                    { value: 'very_good', label: 'Confident' },
                    { value: 'good', label: 'Moderately Confident' },
                    { value: 'average', label: 'Somewhat Confident' },
                ],
            },
            {
                code: 'C6',
                text: 'Communication Style',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent Communicator' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
            {
                code: 'C7',
                text: 'Emotional Intelligence',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
            {
                code: 'C8',
                text: 'Mental Health Status',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
        ],
    },
    {
        section: 'D',
        title: 'Availability & Goals',
        description: 'Your commitment and aspirations',
        questions: [
            {
                code: 'D1',
                text: 'Availability for Events',
                type: 'select',
                required: true,
                options: [
                    { value: 'full_time', label: 'Full-time (anytime)' },
                    { value: 'part_time', label: 'Part-time (weekends)' },
                    { value: 'flexible', label: 'Flexible' },
                    { value: 'limited', label: 'Limited' },
                ],
            },
            {
                code: 'D2',
                text: 'Commitment Level',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Fully Committed' },
                    { value: 'very_good', label: 'Very Committed' },
                    { value: 'good', label: 'Committed' },
                    { value: 'average', label: 'Moderately Committed' },
                ],
            },
            {
                code: 'D3',
                text: 'Physical Health Status',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'very_good', label: 'Very Good' },
                    { value: 'good', label: 'Good' },
                    { value: 'average', label: 'Average' },
                ],
            },
            {
                code: 'D4',
                text: 'Career Goals',
                type: 'multiselect',
                required: true,
                options: [
                    { value: 'international', label: 'International Pageants' },
                    { value: 'national', label: 'National Pageants' },
                    { value: 'modeling', label: 'Professional Modeling' },
                    { value: 'acting', label: 'Acting Career' },
                    { value: 'influencer', label: 'Social Media Influencer' },
                    { value: 'business', label: 'Business/Entrepreneurship' },
                ],
            },
            {
                code: 'D5',
                text: 'Travel Flexibility',
                type: 'select',
                required: true,
                options: [
                    { value: 'excellent', label: 'Can travel anytime' },
                    { value: 'very_good', label: 'Very flexible' },
                    { value: 'good', label: 'Somewhat flexible' },
                    { value: 'average', label: 'Limited flexibility' },
                ],
            },
            { code: 'D6', text: 'What motivates you?', type: 'text', required: true, placeholder: 'Share your motivation...' },
        ],
    },
];

export default function TalentSurvey() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const currentSection = surveyData[currentSectionIndex];
    const totalQuestions = surveyData.reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;

    useEffect(() => {
        // Load saved progress
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const response = await axios.get('/api/survey/progress');
            // Load existing answers if any
            // This is simplified - you'd need to fetch actual answers
        } catch (error) {
            console.error('Failed to load progress:', error);
        }
    };

    const handleAnswerChange = (questionCode: string, value: string | string[] | number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionCode]: value,
        }));
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[questionCode];
            return newErrors;
        });
    };

    const validateSection = (): boolean => {
        const newErrors: Record<string, string> = {};

        currentSection.questions.forEach((question) => {
            if (question.required && !answers[question.code]) {
                newErrors[question.code] = 'This field is required';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async () => {
        if (!validateSection()) {
            return;
        }

        setLoading(true);

        try {
            const sectionAnswers: SurveyAnswer[] = currentSection.questions
                .filter((q) => answers[q.code] !== undefined)
                .map((q) => ({
                    question_code: q.code,
                    answer_value: answers[q.code],
                }));

            await axios.post('/api/survey/submit', {
                section: currentSection.section,
                answers: sectionAnswers,
            });

            if (currentSectionIndex < surveyData.length - 1) {
                setCurrentSectionIndex(currentSectionIndex + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Last section - redirect to calculate
                router.visit('/survey/results');
            }
        } catch (error) {
            console.error('Failed to submit section:', error);
            alert('Failed to save your answers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => {
        if (currentSectionIndex > 0) {
            setCurrentSectionIndex(currentSectionIndex - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Talent Survey - {currentSection.title}
                </h2>
            }
        >
            <Head title={`Survey - ${currentSection.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <ProgressBar current={answeredQuestions} total={totalQuestions} />
                    </div>

                    <div className="mb-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-slate-100">
                                Section {currentSection.section}: {currentSection.title}
                            </h2>
                            <span className="text-sm text-slate-400">
                                {currentSectionIndex + 1} / {surveyData.length}
                            </span>
                        </div>
                        <p className="text-slate-300">{currentSection.description}</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        {currentSection.questions.map((question) => (
                            <QuestionCard
                                key={question.code}
                                question={question}
                                value={answers[question.code] || (question.type === 'multiselect' ? [] : '')}
                                onChange={(value) => handleAnswerChange(question.code, value)}
                                error={errors[question.code]}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePrevious}
                            disabled={currentSectionIndex === 0}
                            className="px-6 py-3 bg-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={loading}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-violet-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : currentSectionIndex === surveyData.length - 1 ? 'Submit & Calculate' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
