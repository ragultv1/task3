import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import type { Task } from '../types';

interface DraggableTaskCardProps {
  task: Task;
  children: React.ReactNode;
}

const ItemTypes = {
  TASK: 'task',
};

const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({ task, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div 
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  );
};

export default DraggableTaskCard;
export { ItemTypes };
