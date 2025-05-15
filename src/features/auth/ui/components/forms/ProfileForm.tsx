/* 

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HttpStatusCode } from '@/core/common/http/HttpStatusCode'
import { UpdateNameDto } from '@/features/auth/domain/dto/ProfileDto'
import { ErrorHandler } from '@/features/auth/domain/models/ErrorHandler'
import { nameSchema } from '@/features/auth/domain/schema/ProfileSchemas'
import { useUpdateNameMutation } from '@/features/auth/infrastructure/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

import { Edit, Loader, Save, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'


const ProfileForm = ({ name }: { name: string }) => {

    const [isEditingName, setIsEditingName] = useState(false)

    const [updateName, { isLoading }] = useUpdateNameMutation()

    const form = useForm<UpdateNameDto>({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            name: name
        },
    })
    useEffect(() => {
        form.setValue("name", name);
    }, [name]);

    const onSubmit = async (updateNameDto: UpdateNameDto) => {

        try {

            if (updateNameDto.name === name) {
                toast.error("El nombre ingresado es igual al actual.");
                return;

            }
            const result = await updateName(updateNameDto).unwrap();
            if (result.status == HttpStatusCode.OK) {

                toast.success(result.message);
                setIsEditingName(false);
            }
        } catch (err) {
            toast.error(new ErrorHandler().handleError(err));
        }


    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Información de perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel>Nombres y Apellidos
                                            </FormLabel>
                                            {isEditingName ? (
                                                <Button type="submit" size="sm" className="gap-2" disabled={isLoading}>
                                                    {isLoading ? (
                                                        <Loader className="animate-spin" />
                                                    ) : (
                                                        <span className="flex items-center gap-2">
                                                            <Save size={16} />
                                                            Guardar

                                                        </span>
                                                    )}
                                                </Button>
                                            ) : (
                                                <Button type="button" onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsEditingName(true);
                                                }} variant="outline" size="sm" className="gap-2">
                                                    <Edit size={16} />
                                                    Editar
                                                </Button>
                                            )}
                                        </div>

                                        <FormControl>
                                            <div className="relative">
                                                <Input className="peer ps-9" placeholder="E-mail" {...field} disabled={isLoading || !isEditingName} />
                                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
                                                    <User size={16} strokeWidth={2} />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default ProfileForm
 */