/* import { useState, useEffect, useLayoutEffect } from 'react';
import { useScrollToBottom } from './use-scroll-to-bottom';
import type { UseChatHelpers } from '@ai-sdk/react';

export function useMessages({
  chatId,
  status,
}: {
  chatId: string;
  status: UseChatHelpers['status'];
}) {
  const {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
  } = useScrollToBottom();

  const [hasSentMessage, setHasSentMessage] = useState(false);

  useLayoutEffect(() => {
    if (chatId) {
      scrollToBottom('instant');
      setHasSentMessage(false);
    }
  }, [chatId, scrollToBottom]);

  useEffect(() => {
    if (status === 'submitted') {
      setHasSentMessage(true);
    }
  }, [status]);

  return {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  };
}
 */


import { useState, useEffect, useLayoutEffect } from 'react'
import type { UseChatHelpers } from '@ai-sdk/react'
import { useScrollToBottom } from './use-scroll-to-bottom'

export function useMessages({
  chatId,
  status,
  messagesLength,
}: {
  chatId: string
  status: UseChatHelpers['status']
  messagesLength: number
}) {
  const {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
  } = useScrollToBottom()

  const [hasSentMessage, setHasSentMessage] = useState(false)

  // Cuando cambia de chat → baja directo
  /* useLayoutEffect(() => {
    if (chatId) {
      scrollToBottom('instant')
      setHasSentMessage(false)
    }
  }, [chatId, scrollToBottom]) */

  useLayoutEffect(() => {
  if (chatId) {
    requestAnimationFrame(() => {
      scrollToBottom('instant')
    })
    setHasSentMessage(false)
  }
}, [chatId, scrollToBottom])

  // Marcar que el user envió mensaje
  useEffect(() => {
    if (status === 'submitted') {
      setHasSentMessage(true)
    }
  }, [status])

  // 👇 Auto scroll solo si el user está abajo
  useEffect(() => {
    if (isAtBottom && messagesLength > 0) {
      scrollToBottom('smooth')
    }
  }, [messagesLength, isAtBottom, scrollToBottom])

  return {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    hasSentMessage,
  }
}
