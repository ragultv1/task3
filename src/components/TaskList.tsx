// components/TaskList.tsx
import React from 'react';
import { useTaskStore } from '../store/TaskStore';
import { useFilterStore } from '../store/FilterStore';
import { useAssigneeStore } from '../store/AssigneeStore';
import TaskCard from './TaskCard';
import DraggableTaskCard from './DraggableTaskCard';
import DroppableArea from './DroppableArea';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const status = useFilterStore((state) => state.status);
  const priority = useFilterStore((state) => state.priority);
  const search = useFilterStore((state) => state.search);

  const statusMap: Record<string, string> = {
    TODO: 'todo',
    IN_PROGRESS: 'inProgress',
    DONE: 'done',
    ALL: 'ALL'
  };

  const selectedAssignee = useAssigneeStore((state) => state.selectedAssignee);

  // Filter tasks based on status, priority, assignee, and search
  let filteredTasks = status === 'ALL'
    ? tasks
    : tasks.filter(task => task.status === statusMap[status]);

  if (priority !== 'ALL') {
    filteredTasks = filteredTasks.filter(task => task.priority.toUpperCase() === priority);
  }

  if (selectedAssignee !== 'ALL') {
    filteredTasks = filteredTasks.filter(task => task.assigneeId === selectedAssignee);
  }

  if (search.trim() !== '') {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(search.trim().toLowerCase())
    );
  }

  const tasksByStatus = {
    'Todo': { tasks: filteredTasks.filter(task => task.status === 'todo'), status: 'todo' as const },
    'In Progress': { tasks: filteredTasks.filter(task => task.status === 'inProgress'), status: 'inProgress' as const },
    'Done': { tasks: filteredTasks.filter(task => task.status === 'done'), status: 'done' as const },
  };

  return (
    <div className="flex gap-6 p-6 h-full">
      {Object.entries(tasksByStatus).map(([statusLabel, { tasks: statusTasks, status: statusValue }]) => (
        <div key={statusLabel} className="flex-1">
          <div className="flex items-center mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">{statusLabel}</h3>
            <span className="px-2 py-1 rounded-full text-lg font-medium">
              {statusTasks.length}
            </span>
          </div>
          
          <DroppableArea status={statusValue}>
            <div className="space-y-3 h-full">
              {statusTasks.length > 0 ? (
                statusTasks.map((task) => (
                  <DraggableTaskCard key={task.id} task={task}>
                    <TaskCard task={task} />
                  </DraggableTaskCard>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No tasks in {statusLabel.toLowerCase()}</p>
                </div>
              )}
            </div>
          </DroppableArea>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

