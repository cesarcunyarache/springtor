import React from 'react'
import { PracticeCase } from '../types'
import { Markdown } from '@/components/markdown'
import { sanitizeText } from '@/lib/utils'
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContentPractice(
    { practice }: { practice: PracticeCase }
) {
    return (
        <Card className=" rounded-lg shadow-lg p-8 mb-8"
            style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
            }}
            onMouseDown={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}

        >
            <div className="flex-1">
                <CardHeader className="p-0 mb-3 flex flex-row items-center gap-4">
                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6" />
                    </div>

                    <CardTitle className="text-2xl font-bold text-gray-900">
                        {practice.title}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Markdown>
                        {(practice.content)}
                    </Markdown>
                </CardContent>
            </div>

        </Card>
    );
}