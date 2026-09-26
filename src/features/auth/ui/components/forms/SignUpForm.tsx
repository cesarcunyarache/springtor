"use client";
import { Mail, Lock, ArrowRight, Loader, Bird, Check, X } from "lucide-react";
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
import { useEffect, useMemo, useState, useTransition } from "react"

/* import { HttpStatusCode } from "@/core/common/http/HttpStatusCode"
import { DostmenLogoNegro } from "@/components/icons/DostmenLogo" */
/* import { signInSchema } from "@/features/auth/domain/schema/SignInSchema" */
import { Github, Google, OpenAI } from "../icons/SocialIcons";
/* import { HttpStatusCode } from "@/core/common/http/HttpStatusCode"; */
import { AuthError } from "next-auth";
import { registerAction } from "@/actions/auth-action";
import { signUpSchema } from "@/features/auth/domain/schema/SignUpSchema";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonSocial from "../botton-social";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { register } from "@/actions/user-action";


export function checkStrength(pass: string) {
    const requirements = [
        { regex: /.{8,}/, text: "Mínimo 8 caracteres" },
        { regex: /[0-9]/, text: "Al menos un número" },
        { regex: /[a-z]/, text: "Al menos una letra minúscula" },
        { regex: /[A-Z]/, text: "Al menos una letra mayúscula" },
    ];
    return requirements.map((req) => ({
        met: req.regex.test(pass),
        text: req.text,
    }));
}


type SignUpDto = z.infer<typeof signUpSchema>

const SignUpForm = () => {

    const [isPending, startTransition] = useTransition()

    const router = useRouter();
    const form = useForm<SignUpDto>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            check: false,
        },
    });

    const onSubmit = async (formData: SignUpDto) => {

        startTransition(async () => {

            try {


                const response = await register(formData);
               /*  if (response.error) {
                    toast.error(response.error);
                } else {
                    router.push("/sign-in");
                } */

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

    const strength = useMemo(() =>
        checkStrength(form.watch("password") || ""),
        [form.watch("password")]
    )

    const strengthScore = useMemo(() =>
        strength.filter((req) => req.met).length,
        [strength]
    )

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
                            Crea tu cuenta{" "}
                            {/* <span className="font-extrabold text-primary">Learcrum </span> */}
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
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <div className="relative">
                                                    <InputPassword className="peer ps-9" placeholder="Contraseña" {...field} disabled={isPending} />
                                                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
                                                        <Lock size={16} strokeWidth={2} />
                                                    </div>
                                                </div>

                                            </div>

                                            {/*  {field.value && (
                                                <>
                                                    <div
                                                        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
                                                        role="progressbar"
                                                        aria-valuemin={0}
                                                        aria-valuemax={4}
                                                    >

                                                        <div
                                                            className={` h-full transition-all duration-500 ease-out ${!field.value
                                                                ? "bg-border"
                                                                : strengthScore <= 1
                                                                    ? "bg-red-500"
                                                                    : strengthScore <= 2
                                                                        ? "bg-orange-500"
                                                                        : strengthScore === 3
                                                                            ? "bg-amber-500"
                                                                            : "bg-emerald-500"
                                                                }`}
                                                            style={{
                                                                width: `${(strengthScore / 4) * 100}%`,
                                                            }}
                                                        />
                                                    </div>

                                                    <ul className="space-y-1.5">
                                                        {strength.map((req, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center gap-2"
                                                            >
                                                                {req.met ? (
                                                                    <Check
                                                                        size={16}
                                                                        className="text-emerald-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={16}
                                                                        className="text-muted-foreground/80"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                                <span
                                                                    className={`text-xs ${req.met
                                                                        ? "text-emerald-600"
                                                                        : "text-muted-foreground"
                                                                        }`}
                                                                >
                                                                    {req.text}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )} */}

                                            
                                                <>
                                                    <AnimatePresence>
                                                        {field.value && (
                                                            <>
                                                                {/* Barra de progreso animada con entrada y salida */}
                                                                {/* <motion.div
                                                                    key="progress-bar"
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${(strengthScore / 4) * 100}%` }}
                                                                    exit={{ width: 0 }}
                                                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                                                    className="mt-3 h-1 rounded-full bg-border overflow-hidden"
                                                                    role="progressbar"
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={4}
                                                                    style={{ position: "relative" }}
                                                                >
                                                                    <div
                                                                        className={`h-full ${strengthScore <= 1
                                                                                ? "bg-red-500"
                                                                                : strengthScore <= 2
                                                                                    ? "bg-orange-500"
                                                                                    : strengthScore === 3
                                                                                        ? "bg-amber-500"
                                                                                        : "bg-emerald-500"
                                                                            }`}
                                                                        style={{ width: "100%" }}
                                                                    />
                                                                </motion.div> */}

{/* <ProgressBar strengthScore={strengthScore} /> */}

                                                                {/* Lista animada con entrada y salida */}
                                                                <motion.ul
                                                                    key="strength-list"
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: "auto" }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                                    className="space-y-3.5 overflow-hidden space-x-1"
                                                                >
                                                                    <ProgressBar strengthScore={strengthScore} />
                                                                    {strength.map((req, index) => (
                                                                        <li key={index} className="flex items-center gap-2">
                                                                            {req.met ? (
                                                                                <Check size={16} className="text-emerald-500" aria-hidden="true" />
                                                                            ) : (
                                                                                <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                                                                            )}
                                                                            <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
                                                                                {req.text}
                                                                            </span>
                                                                        </li>
                                                                    ))}
                                                                </motion.ul>
                                                            </>
                                                        )}
                                                    </AnimatePresence>

                                              
                                                </>
                                            
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Confirmar Contraseña</FormLabel>
                                    <FormControl>

                                        <div className="relative">
                                            <InputPassword className="peer ps-9" placeholder="Confirmar contraseña" {...field} disabled={isPending} />
                                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
                                                <Lock size={16} strokeWidth={2} />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="check"
                            render={({ field }) => (
                                <FormItem className="">
                                    <div className="flex flex-row items-start space-x-1 space-y-0 ">


                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="">
                                            <FormLabel>
                                                <div className="text-balance text-xs text-muted-foreground ">
                                                    Acepto los <a href="#" className="text-primary">Términos de Servicio</a> y la{" "}
                                                    <a href="#" className="text-primary">Política de Privacidad</a>.
                                                </div>
                                            </FormLabel>
                                            {/*  <FormDescription>
                                            You can manage your mobile notifications in the{" "}
                                            <Link href="/examples/forms">mobile settings</Link> page.
                                        </FormDescription> */}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
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
                                O crear con
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
                            ¿Ya tienes una cuenta?{" "}
                            <Link href="/sign-in" className="underline underline-offset-4 text-primary">
                                Inicia sesión
                            </Link>
                        </div>


                    </div>
                </form>
            </Form>


        </div>
    )
}

export default SignUpForm



const ProgressBar = ({ strengthScore }: { strengthScore: number }) => {
    const [visible, setVisible] = useState(strengthScore > 0);
  
    useEffect(() => {
      if (strengthScore > 0) {
        setVisible(true);
      } else {
        const timeout = setTimeout(() => setVisible(false), 700);
        return () => clearTimeout(timeout);
      }
    }, [strengthScore]);
  
    const widthPercent = (strengthScore / 4) * 100;
    const getColor = (score: number) => {
      if (score <= 1) return "#ef4444"; // red-500
      if (score <= 2) return "#f97316"; // orange-500
      if (score === 3) return "#f59e0b"; // amber-500
      return "#22c55e"; // emerald-500
    };
  
    return (
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key="progress-bar"
            initial={{ width: 0, opacity: 0, y: 10, height: 0 }}
            animate={{
              width: `${widthPercent}%`,
              opacity: 1,
              y: 0,
              height: 4,       // altura expandida (ajusta si quieres)
              backgroundColor: getColor(strengthScore),
            }}
            exit={{
              width: 0,
              opacity: 0,
              y: -20,
              height: 0,       // altura contraída al salir
            }}
            transition={{
              width: { duration: 0.7, ease: "easeOut" },
              opacity: { duration: 0.5 },
              y: { duration: 0.5 },
              height: { duration: 0.5 },
            }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={4}
            className="mt-3 rounded-full"
            style={{ backgroundColor: getColor(strengthScore), overflow: "hidden", height: 4 }}
          />
        )}
      </AnimatePresence>
    );
  };