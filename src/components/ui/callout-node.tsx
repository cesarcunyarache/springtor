"use client";

import * as React from "react";

import { useCalloutEmojiPicker } from "@platejs/callout/react";
import { useEmojiDropdownMenuState } from "@platejs/emoji/react";
import { PlateElement } from "platejs/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { EmojiPicker, EmojiPopover } from "./emoji-toolbar-button";

export function CalloutElement({
  attributes,
  children,
  className,
  ...props
}: React.ComponentProps<typeof PlateElement>) {
  const { emojiPickerState, isOpen, setIsOpen } = useEmojiDropdownMenuState({
    closeOnSelect: true,
  });

  const { emojiToolbarDropdownProps, props: calloutProps } =
    useCalloutEmojiPicker({
      isOpen,
      setIsOpen,
    });

  return (
    <PlateElement
      className={cn("my-1 flex rounded-sm bg-slate-100 p-4 pl-3 dark:bg-slate-800", className)}
      style={{
        backgroundColor: props.element.backgroundColor as any,
      }}
      attributes={{
        ...attributes,
        "data-plate-open-context-menu": true,
      }}
      {...props}
    >
      <div className="flex w-full gap-2 rounded-md">
        <EmojiPopover
          {...emojiToolbarDropdownProps}
          control={
            <Button
              variant="ghost"
              className="size-6 p-1 text-[18px] select-none hover:bg-slate-500/15 dark:hover:bg-slate-400/15"
              style={{
                fontFamily:
                  "Apple Color Emoji, Segoe UI NotoColorEmoji, Noto Symbol, Android EmojiSymbols",
              }}
              contentEditable={false}
            >
              {(props.element.icon as any) || "💡"}
            </Button>
          }
        >
          <EmojiPicker {...emojiPickerState} {...calloutProps} />
        </EmojiPopover>
        <div className="w-full">{children}</div>
      </div>
    </PlateElement>
  );
}
