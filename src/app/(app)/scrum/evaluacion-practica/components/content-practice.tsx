import React from 'react'
import { PracticeCase } from '../types'
import { Markdown } from '@/components/markdown'
import { sanitizeText } from '@/lib/utils'
import { Target } from 'lucide-react';

export default function ContentPractice(
    { practice }: { practice: PracticeCase }
) {
    return (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{practice.title}</h2>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-green-700 mb-3">Contexto</h3>
                        <Markdown>{sanitizeText(practice.context)}</Markdown>
                        <h3 className="text-lg font-semibold text-green-700 mb-3">Contenido</h3>
                        <div className=" border-l-4 border-orange-400 p-4 mb-4">
                            <Markdown>{sanitizeText(practice.content)}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}