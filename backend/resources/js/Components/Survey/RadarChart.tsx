import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { RadarChartDataPoint, Tier } from '@/types/survey';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
    data: RadarChartDataPoint[];
    tier: Tier;
}

const tierColors = {
    S: {
        background: 'rgba(251, 191, 36, 0.2)',
        border: 'rgb(251, 191, 36)',
    },
    A: {
        background: 'rgba(203, 213, 225, 0.2)',
        border: 'rgb(203, 213, 225)',
    },
    B: {
        background: 'rgba(168, 85, 247, 0.2)',
        border: 'rgb(168, 85, 247)',
    },
    C: {
        background: 'rgba(52, 211, 153, 0.2)',
        border: 'rgb(52, 211, 153)',
    },
};

export default function RadarChart({ data, tier }: RadarChartProps) {
    const colors = tierColors[tier];

    const chartData = {
        labels: data.map((d) => d.label),
        datasets: [
            {
                label: 'Your Scores',
                data: data.map((d) => d.value),
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 2,
                pointBackgroundColor: colors.border,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors.border,
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 2,
                    color: '#94a3b8',
                    backdropColor: 'transparent',
                },
                grid: {
                    color: '#334155',
                },
                pointLabels: {
                    color: '#e2e8f0',
                    font: {
                        size: 12,
                        weight: 500,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#e2e8f0',
                bodyColor: '#cbd5e1',
                borderColor: '#475569',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: function (context: any) {
                        return `Score: ${context.parsed.r.toFixed(1)} / 10`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h3 className="text-xl font-semibold text-slate-100 mb-6 text-center">
                Performance Radar Chart
            </h3>
            <div className="relative" style={{ height: '400px' }}>
                <Radar data={chartData} options={options} />
            </div>
        </div>
    );
}
