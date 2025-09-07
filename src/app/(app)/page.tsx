import { ArcTimelineDemo } from '@/components/landing/arc-timeline'
import { FeaturesSectionDemo } from '@/components/landing/features'
import FooterGlow from '@/components/landing/footer'
import { HeroSectionOne } from '@/components/landing/hero'
import { NavbarDemo } from '@/components/landing/nav-bar'
import React from 'react'

export default function page() {
  return (
    <div className='m-2'>
        <NavbarDemo />

        <section id="about">
             <HeroSectionOne />

        </section>

        <section id="features">
            <FeaturesSectionDemo />
        </section>

        <section id="timeline" className='max-w-7xl mx-auto'>
            <ArcTimelineDemo />
        </section>

        <FooterGlow />
      
    </div>
  )
}
