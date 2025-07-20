import * as React from "react";

import type { SlateElementProps } from "platejs";

import { ChevronRight } from "lucide-react";
import { SlateElement } from "platejs";

export function ToggleElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props} className="pl-6">
      <div
        className="absolute top-0 -left-0.5 size-6 cursor-pointer items-center justify-center rounded-md p-px text-slate-500 transition-colors select-none hover:bg-slate-100 [&_svg]:size-4 dark:text-slate-400 dark:hover:bg-slate-800"
        contentEditable={false}
      >
        <ChevronRight className="rotate-0 transition-transform duration-75" />
      </div>
      {props.children}
    </SlateElement>
  );
}
