/* 

"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { HttpStatusCode } from '@/core/common/http/HttpStatusCode'
import { UpdateEmailDto } from '@/features/auth/domain/dto/ProfileDto'
import { ErrorHandler } from '@/features/auth/domain/models/ErrorHandler'

import { emailSchema } from '@/features/auth/domain/schema/ProfileSchemas'
import { useUpdateEmailMutation } from '@/features/auth/infrastructure/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'

import { Loader, Mail } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'


const EmailForm = ({ email }: { email: string }) => {

    const [updateEmail, { isLoading }] = useUpdateEmailMutation()

    const form = useForm<UpdateEmailDto>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (updateEmailDto: UpdateEmailDto) => {

        try {

            if (updateEmailDto.email === email) {
                toast.error("El correo electrónico ingresado es igual al actual.");
                return;

            }
            const result = await updateEmail(updateEmailDto).unwrap();
            if (result.status == HttpStatusCode.OK) {

                toast.success(result.message);
                form.reset();
            }
        } catch (err) {
            toast.error(new ErrorHandler().handleError(err));
        }


    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Configuración de Correo Electrónico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-sm">Correo electrónico actual</Label>
                    <div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
                        <Mail size={16} className=" text-muted-foreground" />
                        <span className="text-sm">{email}</span>

                    </div>
                </div>

                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input className="peer ps-9" placeholder="Ingresa el correo electrónico" {...field} type="email" disabled={isLoading} />
                                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
                                                    <Mail size={16} strokeWidth={2} />
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
                                        <Mail size={16} />
                                        Actualizar Correo electrónico

                                    </span>
                                )}
                            </Button>

                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default EmailForm;
 */