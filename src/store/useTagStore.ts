import { create } from 'zustand';

interface TagStore {
  tags: string[];
  selectedTag: string | null;
  addTag: (tag: string) => void;
  setSelectedTag: (tag: string | null) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  tags: ['Design', 'Development', 'UX/UI', 'Marketing'],
  selectedTag: null,
  addTag: (tag) => set((state) => {
    // Only add tag if it doesn't already exist
    if (!state.tags.includes(tag)) {
      return { tags: [...state.tags, tag] };
    }
    return state;
  }),
  setSelectedTag: (tag) => set({ selectedTag: tag })
}));
