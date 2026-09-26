"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

type AlertType = "warning" | "success";

interface AlertDialogMessageProps {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  type?: AlertType;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export default function AlertDialogMessage({
  open,
  onClose,
  onConfirm,
  type = "warning",
  title,
  description,
  confirmText = "Aceptar",
  cancelText,
}: AlertDialogMessageProps) {
  // Configuración de estilos según tipo
  const isWarning = type === "warning";
  const icon = isWarning ? (
    <AlertTriangle className="h-7 w-7 text-amber-500" />
  ) : (
    <CheckCircle2 className="h-7 w-7 text-green-600" />
  );

  const bgColor = isWarning ? "bg-amber-100" : "bg-green-100";
  const variant = isWarning ? "outline" : "default";

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center text-center">
          <AlertDialogTitle>
            <div
              className={`mb-3 mx-auto flex h-14 w-14 items-center justify-center rounded-full ${bgColor}`}
            >
              {icon}
            </div>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px] text-muted-foreground mt-2">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-3 sm:justify-center">
          {cancelText && (
            <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
          )}

          <AlertDialogAction
            className={buttonVariants({ variant })}
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
