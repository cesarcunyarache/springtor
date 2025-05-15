/* "use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { passwordSchema } from '@/features/auth/domain/schema/ProfileSchemas';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UpdatePasswordDto } from '@/features/auth/domain/dto/ProfileDto';
import { useUpdatePasswordMutation } from '@/features/auth/infrastructure/services/auth.service';
import { HttpStatusCode } from '@/core/common/http/HttpStatusCode';
import { ErrorHandler } from '@/features/auth/domain/models/ErrorHandler';
import { InputPassword } from '@/components/ui/input-passoword';

const PasswordForm = () => {

    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const form = useForm<UpdatePasswordDto>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    });


    const onSubmit = async (updatePasswordDto: UpdatePasswordDto) => {
        try {


            const result = await updatePassword(updatePasswordDto).unwrap();
            if (result.status == HttpStatusCode.OK) {

                toast.success(result.message);
                form.reset();
            }
        } catch (err) {
            toast.error(new ErrorHandler().handleError(err));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Actualizar Contraseña</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="current-password">Contraseña Actual</FormLabel>
                                    <FormControl>
                                        <InputPassword
                                            id="current-password"
                                            placeholder="Ingresa la contraseña actual"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="new-password">Nueva Contraseña</FormLabel>
                                    <FormControl>
                                        <InputPassword
                                            id="new-password"
                                            
                                            placeholder="Ingresa la nueva contraseña"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="confirm-password">Confirmar Nueva Contraseña</FormLabel>
                                    <FormControl>
                                        <InputPassword
                                            id="confirm-password"
                                           
                                            placeholder="Confirmar nueva contraseña"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full gap-2"
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={16} />
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Lock size={16} />
                                    Actualizar Contraseña
                                </span>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default PasswordForm;
 */