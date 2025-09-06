"use client"

import OnboardingForm from '@/components/onboarding/onboarding-form'
import { saveUserPreferences } from '@/lib/db/queries/user';
import { redirect } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default function ClientPage() {
  return (
    <div>
      <OnboardingForm onSubmit={(data) => {
         toast.promise(saveUserPreferences(data), {
            loading: 'Enviando...',
            success: (res: boolean) => {
                return res ? 'Preferencias guardadas con éxito' : 'Algo salió mal. Por favor, inténtalo de nuevo';
            },
            error: 'Algo salió mal. Por favor, inténtalo de nuevo.',
            finally: () => {
                redirect('/roadmap');
            }
        });
      }} />
    </div>
  )
}
