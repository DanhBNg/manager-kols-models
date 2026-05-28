import React from 'react';
import { PageantRecommendation } from '@/types/survey';

interface RecommendationCardProps {
    recommendation: PageantRecommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-blue-400';
        if (score >= 40) return 'text-yellow-400';
        return 'text-orange-400';
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'bg-green-500/10 border-green-500/20';
        if (score >= 60) return 'bg-blue-500/10 border-blue-500/20';
        if (score >= 40) return 'bg-yellow-500/10 border-yellow-500/20';
        return 'bg-orange-500/10 border-orange-500/20';
    };

    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-100 flex-1">
                    {recommendation.pageant_name}
                </h3>
                <div
                    className={`
                        px-3 py-1 rounded-full border
                        ${getScoreBg(recommendation.match_score)}
                    `}
                >
                    <span className={`text-sm font-bold ${getScoreColor(recommendation.match_score)}`}>
                        {recommendation.match_score}%
                    </span>
                </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {recommendation.reasoning}
            </p>

            <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-violet-600 transition-all">
                    Learn More
                </button>
                <button className="px-4 py-2 bg-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-600 transition-colors">
                    Save
                </button>
            </div>
        </div>
    );
}
