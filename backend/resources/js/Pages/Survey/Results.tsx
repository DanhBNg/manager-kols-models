import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TierBadge from '@/Components/Survey/TierBadge';
import RadarChart from '@/Components/Survey/RadarChart';
import RecommendationCard from '@/Components/Survey/RecommendationCard';
import { CalculateResponse, RecommendationsResponse } from '@/types/survey';
import axios from 'axios';

export default function Results() {
    const [loading, setLoading] = useState(true);
    const [calculating, setCalculating] = useState(false);
    const [results, setResults] = useState<CalculateResponse | null>(null);
    const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        calculateResults();
    }, []);

    const calculateResults = async () => {
        setCalculating(true);
        try {
            // Calculate scores
            const calcResponse = await axios.post<CalculateResponse>('/api/survey/calculate');
            setResults(calcResponse.data);

            // Get recommendations
            const recResponse = await axios.get<RecommendationsResponse>('/api/recommendations');
            setRecommendations(recResponse.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to calculate results');
        } finally {
            setCalculating(false);
            setLoading(false);
        }
    };

    if (loading || calculating) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Survey Results
                    </h2>
                }
            >
                <Head title="Survey Results" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center min-h-[400px]">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-slate-300 text-lg">Calculating your tier...</p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (error || !results) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Survey Results
                    </h2>
                }
            >
                <Head title="Survey Results" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center">
                            <p className="text-red-400 text-lg mb-4">{error || 'No results found'}</p>
                            <button
                                onClick={() => window.location.href = '/survey/start'}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Take Survey
                            </button>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const criteriaNames: Record<string, string> = {
        'M1.1': 'Physical Attributes',
        'M1.2': 'Beauty Standards',
        'M1.3': 'Social Media',
        'M1.4': 'Communication',
        'M1.5': 'Experience',
        'M1.6': 'Education',
        'M1.7': 'Personality',
        'M1.8': 'Availability',
        'M1.9': 'Health',
        'M1.10': 'Special Skills',
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Your Talent Tier Results
                </h2>
            }
        >
            <Head title="Survey Results" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Tier Badge Section */}
                    <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
                        <h2 className="text-3xl font-bold text-slate-100 mb-8">
                            Congratulations! Your Tier is:
                        </h2>
                        <TierBadge tier={results.tier} size="lg" animated />
                        <div className="mt-8">
                            <div className="text-lg text-slate-300 mb-2">Overall Score</div>
                            <div className="text-5xl font-bold text-blue-400">
                                {results.overall_score.toFixed(1)}
                                <span className="text-2xl text-slate-500">/100</span>
                            </div>
                        </div>
                    </div>

                    {/* Radar Chart */}
                    <RadarChart data={results.radar_chart_data} tier={results.tier} />

                    {/* Criteria Breakdown */}
                    <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                        <h3 className="text-2xl font-bold text-slate-100 mb-6">Criteria Breakdown</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(results.criteria_scores).map(([code, score]) => (
                                <div
                                    key={code}
                                    className="bg-slate-700 rounded-lg p-4 flex items-center justify-between"
                                >
                                    <div>
                                        <div className="text-sm text-slate-400">{code}</div>
                                        <div className="text-lg font-semibold text-slate-100">
                                            {criteriaNames[code]}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-400">
                                            {score.toFixed(1)}
                                        </div>
                                        <div className="text-sm text-slate-500">/10</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pageant Recommendations */}
                    {recommendations && recommendations.pageants.length > 0 && (
                        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                            <h3 className="text-2xl font-bold text-slate-100 mb-2">
                                Recommended Pageants
                            </h3>
                            <p className="text-slate-400 mb-6">
                                Based on your {recommendations.tier} tier, here are the best pageants for you:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                {recommendations.pageants.map((pageant, index) => (
                                    <RecommendationCard key={index} recommendation={pageant} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-3 bg-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-600 transition-colors"
                        >
                            Print Results
                        </button>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-violet-600 transition-all"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
