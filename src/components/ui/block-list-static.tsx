import * as React from "react";

import type {
  RenderStaticNodeWrapper,
  SlateRenderElementProps,
  TListElement,
} from "platejs";

import { isOrderedList } from "@platejs/list";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const config: Record<
  string,
  {
    Li: React.FC<SlateRenderElementProps>;
    Marker: React.FC<SlateRenderElementProps>;
  }
> = {
  todo: {
    Li: TodoLiStatic,
    Marker: TodoMarkerStatic,
  },
};

export const BlockListStatic: RenderStaticNodeWrapper = (props) => {
  if (!props.element.listStyleType) return;

  const StaticListComponent = (props: any) => <List {...props} />;
  StaticListComponent.displayName = "BlockListStaticInner";

  return StaticListComponent;
};

function List(props: SlateRenderElementProps) {
  const { listStart, listStyleType } = props.element as TListElement;
  const { Li, Marker } = config[listStyleType] ?? {};
  const List = isOrderedList(props.element) ? "ol" : "ul";

  return (
    <List
      className="relative m-0 p-0"
      style={{ listStyleType }}
      start={listStart}
    >
      {Marker && <Marker {...props} />}
      {Li ? <Li {...props} /> : <li>{props.children}</li>}
    </List>
  );
}

function TodoMarkerStatic(props: SlateRenderElementProps) {
  const checked = props.element.checked as boolean;

  return (
    <div contentEditable={false}>
      <button
        className={cn(
          "peer pointer-events-none absolute top-1 -left-6 size-4 shrink-0 rounded-sm border border-slate-200 border-slate-900 bg-white ring-offset-white focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:bg-slate-900 data-[state=checked]:text-primary-foreground dark:border-slate-800 dark:border-slate-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50",
          props.className
        )}
        data-state={checked ? "checked" : "unchecked"}
        type="button"
      >
        <div className={cn("flex items-center justify-center text-current")}>
          {checked && <CheckIcon className="size-4" />}
        </div>
      </button>
    </div>
  );
}

function TodoLiStatic(props: SlateRenderElementProps) {
  return (
    <li
      className={cn(
        "list-none",
        (props.element.checked as boolean) &&
          "text-muted-foreground line-through"
      )}
    >
      {props.children}
    </li>
  );
}
