export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
  assigneeId?: string;
}
