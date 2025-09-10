import { create } from 'zustand';

type Status = 'ALL' | 'TODO' | 'IN_PROGRESS' | 'DONE';

type FilterState = {
  status: Status;
  setStatus: (status: Status) => void;
  priority: Priority;
  setPriority: (priority: Priority) => void;
  search: string;
  setSearch: (search: string) => void;
};

type Priority = 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';


export const useFilterStore = create<FilterState>((set) => ({
  status: 'TODO',
  setStatus: (status) => set(() => ({ status })),
  priority: 'ALL',
  setPriority: (priority) => set(() => ({ priority })),
  search: '',
  setSearch: (search) => set(() => ({ search })),
}));
