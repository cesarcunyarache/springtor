'use server'

import { signIn } from "next-auth/react"

export async function signInAction(formData: {
    email: string
    password: string
}) {
    try {
        return await signIn("credentials", formData)
    } catch (error) {
        throw error
    }
}