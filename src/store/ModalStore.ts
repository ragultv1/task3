import { create } from 'zustand';

// Store for controlling the CreateTask modal visibility
type ModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}));
