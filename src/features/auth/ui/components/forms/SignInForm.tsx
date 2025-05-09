"use client";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { Input } from "@/components/ui/input"
import { InputPassword } from "@/components/ui/input-passoword"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { toast } from "sonner"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

/* import { signIn } from "next-auth/react" */
import { useRouter } from "next/navigation"
import { useTransition } from "react"

/* import { HttpStatusCode } from "@/core/common/http/HttpStatusCode"
import { DostmenLogoNegro } from "@/components/icons/DostmenLogo" */
import { signInSchema } from "@/features/auth/domain/schema/SignInSchema"



type SignInDto = z.infer<typeof signInSchema>

const SignInForm = () => {

    const [isPending, startTransition] = useTransition()

    const router = useRouter();
    const form = useForm<SignInDto>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (formData: SignInDto) => {

        startTransition(async () => {

            try {
                /* const res = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                })

                if (res?.error) {
                    toast.error(res.error);
                } */

                /* if (res?.status === HttpStatusCode.OK) {
                    router.push("/dashboard")
                } */

            } catch {
               
            }
        })

    }

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a href="#" className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md">
                              {/*  <DostmenLogoNegro className="size-6" /> */}
                            </div>
                        </a>
                        <h1 className="text-xl font-bold">Bienvenido a Allen Dostmen S.A.C</h1>
                        <div className="text-center text-sm">
                            Ingresa tus credenciales para acceder a tu cuenta
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>E-mail</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input className="peer ps-9" placeholder="E-mail" {...field} type="email" disabled={isPending} />
                                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
                                                <Mail size={16} strokeWidth={2} />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Contraseña</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <InputPassword className="peer ps-9" placeholder="Contraseña" {...field} disabled={isPending} />
                                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
                                                <Lock size={16} strokeWidth={2} />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Login
                                    <ArrowRight size={16} />
                                </span>
                            )}
                        </Button>


                    </div>
                </form>
            </Form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                Al hacer clic en continuar, aceptas nuestros <a href="#">Términos de Servicio</a> y nuestra{" "}
                <a href="#">Política de Privacidad</a>.
            </div>

        </div>
    )
}

export default SignInForm