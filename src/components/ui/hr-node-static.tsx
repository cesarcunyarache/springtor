import * as React from "react";

import type { SlateElementProps } from "platejs";

import { SlateElement } from "platejs";

import { cn } from "@/lib/utils";

export function HrElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props}>
      <div className="cursor-text py-6" contentEditable={false}>
        <hr
          className={cn(
            "h-0.5 rounded-sm border-none bg-slate-100 bg-clip-content dark:bg-slate-800"
          )}
        />
      </div>
      {props.children}
    </SlateElement>
  );
}
