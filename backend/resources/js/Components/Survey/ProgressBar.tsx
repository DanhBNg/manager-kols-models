import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    className?: string;
}

export default function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">
                    Progress: {current} / {total}
                </span>
                <span className="text-sm font-medium text-blue-400">
                    {percentage}%
                </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-blue-500 to-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
