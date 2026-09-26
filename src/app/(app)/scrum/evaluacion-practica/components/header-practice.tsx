import React from 'react'
import { PracticeCase } from '../types'
import { Target } from 'lucide-react'

export default function HeaderPractice(
    { practice }: { practice: PracticeCase }
) {
    return (
        <div className="bg-background shadow-sm border-b sticky top-0 z-10">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Target className="w-8 h-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold ">{practice.title}</h1>
                            <p className="text-sm ">{practice.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
