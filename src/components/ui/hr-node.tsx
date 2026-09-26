"use client";

import * as React from "react";

import type { PlateElementProps } from "platejs/react";

import {
  PlateElement,
  useFocused,
  useReadOnly,
  useSelected,
} from "platejs/react";

import { cn } from "@/lib/utils";

export function HrElement(props: PlateElementProps) {
  const readOnly = useReadOnly();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <PlateElement {...props}>
      <div className="py-6" contentEditable={false}>
        <hr
          className={cn(
            "h-0.5 rounded-sm border-none bg-slate-100 bg-clip-content dark:bg-slate-800",
            selected && focused && "ring-2 ring-slate-950 ring-offset-2 dark:ring-slate-300",
            !readOnly && "cursor-pointer"
          )}
        />
      </div>
      {props.children}
    </PlateElement>
  );
}
