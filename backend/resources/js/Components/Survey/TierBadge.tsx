import React from 'react';
import { Tier } from '@/types/survey';

interface TierBadgeProps {
    tier: Tier;
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;
}

const tierConfig = {
    S: {
        gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
        shadow: 'shadow-yellow-500/50',
        label: 'S Tier',
        description: 'Elite',
    },
    A: {
        gradient: 'from-slate-300 via-slate-400 to-slate-500',
        shadow: 'shadow-slate-400/50',
        label: 'A Tier',
        description: 'Excellent',
    },
    B: {
        gradient: 'from-purple-500 via-purple-600 to-fuchsia-600',
        shadow: 'shadow-purple-500/50',
        label: 'B Tier',
        description: 'Good',
    },
    C: {
        gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
        shadow: 'shadow-emerald-400/50',
        label: 'C Tier',
        description: 'Promising',
    },
};

const sizeConfig = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-6xl',
};

export default function TierBadge({ tier, size = 'md', animated = false }: TierBadgeProps) {
    const config = tierConfig[tier];
    const sizeClass = sizeConfig[size];

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className={`
                    ${sizeClass}
                    rounded-full
                    bg-gradient-to-br ${config.gradient}
                    ${config.shadow}
                    shadow-lg
                    flex items-center justify-center
                    font-bold text-white
                    ${animated ? 'animate-pulse' : ''}
                    border-4 border-white/20
                `}
            >
                {tier}
            </div>
            <div className="text-center">
                <div className="text-lg font-semibold text-slate-100">{config.label}</div>
                <div className="text-sm text-slate-400">{config.description}</div>
            </div>
        </div>
    );
}
