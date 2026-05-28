import React from 'react';
import { Question } from '@/types/survey';

interface QuestionCardProps {
    question: Question;
    value: string | string[] | number;
    onChange: (value: string | string[] | number) => void;
    error?: string;
}

export default function QuestionCard({ question, value, onChange, error }: QuestionCardProps) {
    const renderInput = () => {
        switch (question.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={value as number}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        placeholder={question.placeholder}
                        min={question.min}
                        max={question.max}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                );

            case 'select':
                return (
                    <select
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select an option</option>
                        {question.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'multiselect':
                return (
                    <div className="space-y-2">
                        {question.options?.map((option) => {
                            const isChecked = Array.isArray(value) && value.includes(option.value);
                            return (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-3 p-3 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => {
                                            const currentValues = Array.isArray(value) ? value : [];
                                            if (e.target.checked) {
                                                onChange([...currentValues, option.value]);
                                            } else {
                                                onChange(currentValues.filter((v) => v !== option.value));
                                            }
                                        }}
                                        className="w-5 h-5 text-blue-500 bg-slate-600 border-slate-500 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-slate-100">{option.label}</span>
                                </label>
                            );
                        })}
                    </div>
                );

            case 'date':
                return (
                    <input
                        type="date"
                        value={value as string}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="mb-4">
                <label className="block text-lg font-medium text-slate-100 mb-2">
                    {question.text}
                    {question.required && <span className="text-red-400 ml-1">*</span>}
                </label>
            </div>
            {renderInput()}
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>
    );
}
