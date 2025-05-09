"use client"

import { useMountedState } from "react-use";
import { AccountDialog } from "../components/account-dialog";
import { NewProfesionalDialog } from "@/features/profesional/ui/components/new-profesional-dialog";
import { NewTestimonialDialog } from "@/features/testimonial/ui/components/new-testimonial-dialog";
import { NewProjectDialog } from "@/features/project/ui/components/new-project-dialog";
import { NewPermissionDialog } from "@/features/permission/ui/components/new-permission-dialog";
import { NewUserDialog } from "@/features/user/ui/components/new-user-dialog";


export const DialogProvider = () => {

    const isMounted = useMountedState();
    if (!isMounted) return null;

    return (
        <>
        <AccountDialog />
        <NewProfesionalDialog/>
        <NewTestimonialDialog/>
        <NewProjectDialog/>
        <NewPermissionDialog/>
        <NewUserDialog/>
            
        </>
    )
}   