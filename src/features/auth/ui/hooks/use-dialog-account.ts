import { create } from 'zustand'

type AccountState = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useDialogAccount = create<AccountState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),    
    onClose: () => set({ isOpen: false }),
}))

export default useDialogAccount