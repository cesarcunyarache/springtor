"use client";
import { Mail, Lock, ArrowRight, Loader, Bird } from "lucide-react";
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
import { useState, useTransition } from "react"

/* import { HttpStatusCode } from "@/core/common/http/HttpStatusCode"
import { DostmenLogoNegro } from "@/components/icons/DostmenLogo" */
import { signInSchema } from "@/features/auth/domain/schema/SignInSchema"
import { Github, Google, OpenAI } from "../icons/SocialIcons";
/* import { HttpStatusCode } from "@/core/common/http/HttpStatusCode"; */
import { AuthError } from "next-auth";
import { loginAction, /* signInGoogle */ } from "@/actions/auth-action";
import ButtonSocial from "../botton-social";
import Link from "next/link";



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


                const response = await loginAction(formData);
                if (response.error) {
                    toast.error(response.error);
                } else {
                   /*  router.push("/"); */
                }

               /*  router.push("/"); */
                /*  const res = await signIn("credentials", {
                     email: formData.email,
                     password: formData.password,
                     redirect: false,
                 })
 
                 if (res?.error) {
                     
                     console.log(res)
                     toast.error("Error al iniciar sesión");
                     toast.error(res.error);
                 }
 
 
                 if (res?.status === HttpStatusCode.OK) {
                     router.push("/dashboard")
                 } */

            } catch (error) {
                if (error instanceof AuthError) {
                    toast.error(error.cause?.err?.message);
                }
            }
        })

    }

    const [isLoadingState] = useState(false);
    const isLoading = isLoadingState || isPending;

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col items-start gap-2">
                        <a href="#" className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex items-center justify-center rounded-md">
                                {/*  <DostmenLogoNegro className="size-6" /> */}
                                <Bird className="size-12 text-primary" />
                            </div>
                        </a>
                        <h1 className="text-2xl font-bold">
                            Inicia sesión en{" "}
                            <span className="font-extrabold text-primary">Springtor </span>
                        </h1>
                        {/* <div className="text-center text-sm">
                            Ingresa tus credenciales para acceder a tu cuenta
                        </div> */}
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
                                            <Input className="peer ps-9" placeholder="E-mail" {...field} type="email" disabled={isLoading} />
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
                                    <div className="flex items-center">
                                        <FormLabel required>Contraseña</FormLabel>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-2 hover:underline text-primary"
                                        >
                                            ¿Has olvidado tu contraseña?
                                        </a>
                                    </div>

                                    <FormControl>
                                        <div className="relative">
                                            <InputPassword className="peer ps-9" placeholder="Contraseña" {...field} disabled={isLoading} />
                                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
                                                <Lock size={16} strokeWidth={2} />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Continuar
                                    <ArrowRight size={16} />
                                </span>
                            )}
                        </Button>

                        <div className="after:border-slate-200 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t dark:after:border-slate-800">
                            <span className="bg-white text-slate-500 relative z-10 px-2 dark:bg-slate-950 dark:text-slate-400">
                                O continua con
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <ButtonSocial provider="google">
                                <Google />
                                <span className="sr-only">Login with Google</span>
                            </ButtonSocial>
                            <ButtonSocial provider="github">
                                <Github />
                            </ButtonSocial>
                            <ButtonSocial provider="openai" disabled={true}>
                                <OpenAI />
                            </ButtonSocial>

                        </div>
                        <div className="text-center text-sm">
                            ¿Aún no tienes una cuenta?{" "}
                            <Link href="/sign-up" className="underline underline-offset-4 text-primary">
                                Regístrate
                            </Link>
                        </div>


                    </div>
                </form>
            </Form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                Al hacer clic en continuar, aceptas nuestros <a href="#" className="text-primary">Términos de Servicio</a> y nuestra{" "}
                <a href="#" className="text-primary">Política de Privacidad</a>.
            </div>

        </div>
    )
}

export default SignInForm