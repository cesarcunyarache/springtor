"use client"

import useDialogAccount from '../hooks/use-dialog-account';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AccountForm from './forms/AccountForm';

import { useProfileQuery } from '../../infrastructure/services/auth.service';

import {  useEffect } from 'react';


export const AccountDialog = () => {

    const { isOpen, onClose } = useDialogAccount();

    const { data, /* isLoading */ refetch } = useProfileQuery({});


    useEffect(() => {
        refetch();
    }, [isOpen]);
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Cuenta</DialogTitle>
                    <DialogDescription>
                        Edita tus datos de cuenta y contraseña
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[80vh] overflow-y-auto p-4">

                    <AccountForm account={data?.data} />
                </div>

            </DialogContent>
        </Dialog>
    );
}