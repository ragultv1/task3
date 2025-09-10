import { create } from 'zustand';

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

interface AssigneeStore {
  assignees: Assignee[];
  selectedAssignee: string;
  setSelectedAssignee: (id: string) => void;
  addAssignee: (assignee: Assignee) => void;
}

const defaultAssignees: Assignee[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: '5',
    name: 'Alex Kumar',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&fit=crop&crop=face',
  },
];

export const useAssigneeStore = create<AssigneeStore>((set) => ({
  assignees: defaultAssignees,
  selectedAssignee: 'ALL',
  setSelectedAssignee: (id) => set({ selectedAssignee: id }),
  addAssignee: (assignee) =>
    set((state) => ({ assignees: [...state.assignees, assignee] })),
}));
