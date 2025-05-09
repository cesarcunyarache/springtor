"use client"

import type React from "react"





import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmailForm from "./EmailForm"
import ProfileForm from "./ProfileForm"
import PasswordForm from "./PasswordForm"
import { Camera } from "lucide-react"

import { getInitials } from "@/lib/utils"


interface AccountProps {
    id?: string
    name?: string
    email?: string
    emailVerified?: Date | null
    image?: string | null
}

const defaultAccount: AccountProps = {
    id: "",
    name: "",
    email: "",
    emailVerified: new Date(),
    image: null,
}

export default function AccountForm({ account = defaultAccount }: { account?: AccountProps }) {
    
    /* const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        
    } */

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={account.image || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                        <AvatarFallback className="text-xl">
                            {getInitials(account?.name ?? "")}
                        </AvatarFallback>
                    </Avatar>
                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 cursor-pointer">
                        <div className="rounded-full bg-primary p-3 text-primary-foreground hover:bg-primary/90 transition-colors">
                            <Camera size={16} />
                        </div>
                        <input
                            id="avatar-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                           /*  onChange={handleImageUpload} */
                        />
                    </label>
                </div>
            </div>

            <div className="">
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">Perfil</TabsTrigger>
                        <TabsTrigger value="email">Correo electrónico</TabsTrigger>
                        <TabsTrigger value="password">Contraseña</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                         <ProfileForm name={account.name ?? ""}/>
                    </TabsContent>
                    <TabsContent value="email">
                        <EmailForm email={account.email ?? ""} />
                    </TabsContent>
                    <TabsContent value="password">
                        <PasswordForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>

    )
}

