import * as React from "react";

import type { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";
import { type PlateStaticProps, PlateStatic } from "platejs";

import { cn } from "@/lib/utils";

export const editorVariants = cva(
  cn(
    "group/editor",
    "relative w-full cursor-text overflow-x-hidden break-words whitespace-pre-wrap select-text",
    "rounded-md ring-offset-white focus-visible:outline-none dark:ring-offset-slate-950",
    "placeholder:text-slate-500/80 **:data-slate-placeholder:top-[auto_!important] **:data-slate-placeholder:text-slate-500/80 **:data-slate-placeholder:opacity-100! dark:placeholder:text-slate-400/80 dark:**:data-slate-placeholder:text-slate-400/80",
    "[&_strong]:font-bold"
  ),
  {
    defaultVariants: {
      variant: "none",
    },
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      focused: {
        true: "ring-2 ring-slate-950 ring-offset-2 dark:ring-slate-300",
      },
      variant: {
        ai: "w-full px-0 text-base md:text-sm",
        aiChat:
          "max-h-[min(70vh,320px)] w-full max-w-[700px] overflow-y-auto px-5 py-3 text-base md:text-sm",
        default:
          "size-full px-16 pt-4 pb-72 text-base sm:px-[max(64px,calc(50%-350px))]",
        demo: "size-full px-16 pt-4 pb-72 text-base sm:px-[max(64px,calc(50%-350px))]",
        fullWidth: "size-full px-16 pt-4 pb-72 text-base sm:px-24",
        none: "",
        select: "px-3 py-2 text-base data-readonly:w-fit",
      },
    },
  }
);

export function EditorStatic({
  className,
  variant,
  ...props
}: PlateStaticProps & VariantProps<typeof editorVariants>) {
  return (
    <PlateStatic
      className={cn(editorVariants({ variant }), className)}
      {...props}
    />
  );
}
