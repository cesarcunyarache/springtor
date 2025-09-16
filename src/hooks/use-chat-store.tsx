import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ChatState {
  isChatOpen: boolean
  toggleChat: () => void
  openChat: () => void
  closeChat: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      isChatOpen: false,
      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
      openChat: () => set({ isChatOpen: true }),
      closeChat: () => set({ isChatOpen: false }),
    }),
    {
      name: "chat-storage",
    }
  )
)
