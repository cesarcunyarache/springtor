"use client";

import * as React from "react";

import { CopilotPlugin } from "@platejs/ai/react";
import { useElement, usePluginOption } from "platejs/react";

export function GhostText() {
  const element = useElement();

  const isSuggested = usePluginOption(
    CopilotPlugin,
    "isSuggested",
    element.id as string
  );

  if (!isSuggested) return null;

  return <GhostTextContent />;
}

function GhostTextContent() {
  const suggestionText = usePluginOption(CopilotPlugin, "suggestionText");

  return (
    <span
      className="pointer-events-none text-slate-500/70 max-sm:hidden dark:text-slate-400/70"
      contentEditable={false}
    >
      {suggestionText && suggestionText}
    </span>
  );
}
