"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react"

interface ButtonSocialProps extends React.ComponentProps<"button"> {
    children: React.ReactNode;
    provider: string;
}

const ButtonSocial = ({ children, provider, ...props }: ButtonSocialProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            await signIn(provider);
/* 
            router.push("/"); */
        } catch (error) {
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleClick}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Loader className="animate-spin" /> : children}
        </Button>
    );
};
export default ButtonSocial;