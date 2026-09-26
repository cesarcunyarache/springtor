import { redirect } from 'next/navigation';
import React from 'react'

export default function page() {

    redirect('/scrum/roadmap');

    return (
        <div>
            <h1>¡Hello Scrum Master!</h1>
        </div>
    )
}
