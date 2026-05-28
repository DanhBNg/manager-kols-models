import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TierBadge from '@/Components/Survey/TierBadge';

export default function Welcome() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Talent Tiering Survey
                </h2>
            }
        >
            <Head title="Talent Survey" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-slate-900 shadow-sm sm:rounded-lg border border-slate-800">
                        <div className="p-12 text-center">
                            <h1 className="text-4xl font-bold text-slate-100 mb-4">
                                Discover Your Talent Tier
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                                Complete our comprehensive 30-question survey to receive your personalized
                                talent tier rating and pageant recommendations.
                            </p>

                            <div className="flex justify-center gap-8 mb-12">
                                <TierBadge tier="S" size="sm" />
                                <TierBadge tier="A" size="sm" />
                                <TierBadge tier="B" size="sm" />
                                <TierBadge tier="C" size="sm" />
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                    <div className="text-3xl mb-2">📊</div>
                                    <h3 className="text-lg font-semibold text-slate-100 mb-2">
                                        10 Criteria
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        Evaluated across physical attributes, skills, experience, and more
                                    </p>
                                </div>

                                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                    <div className="text-3xl mb-2">⏱️</div>
                                    <h3 className="text-lg font-semibold text-slate-100 mb-2">
                                        10-15 Minutes
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        Quick and easy survey with auto-save progress
                                    </p>
                                </div>

                                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                    <div className="text-3xl mb-2">🎯</div>
                                    <h3 className="text-lg font-semibold text-slate-100 mb-2">
                                        Personalized Results
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        Get tier rating and tailored pageant recommendations
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/survey/start"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-violet-600 transition-all shadow-lg hover:shadow-xl"
                            >
                                Start Survey
                            </Link>

                            <p className="text-sm text-slate-500 mt-6">
                                Your responses are confidential and used only for tier calculation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
