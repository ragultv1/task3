import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './DraggableTaskCard';
import { useTaskStore } from '../store/TaskStore';

interface DroppableAreaProps {
  status: 'todo' | 'inProgress' | 'done';
  children: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ status, children }) => {
  const updateTask = useTaskStore((state) => state.updateTask);
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item: { id: string, status: string }) => {
      if (item.status !== status) {
        updateTask(item.id, { status });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  return (
    <div 
      ref={ref} 
      className={`h-full rounded-lg transition-colors ${isOver ? 'bg-gray-100' : ''}`}
    >
      {children}
    </div>
  );
};

export default DroppableArea;
