// components/TaskCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import type { Task } from '../types';
import { PiDotsThreeOutlineFill, PiCaretRightBold } from "react-icons/pi";
import { useTaskStore } from '../store/TaskStore';
import { useAssigneeStore } from '../store/AssigneeStore';
import EditTask from './EditTask';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const updateTask = useTaskStore((state) => state.updateTask);

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMoveTask = (newStatus: 'todo' | 'inProgress' | 'done') => {
    updateTask(task.id, { status: newStatus });
    setIsMenuOpen(false);
    setIsSubMenuOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className='flex justify-between items-start relative'>
  <h4 className={`font-medium text-gray-900 mb-2 ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>{task.title}</h4>
        <div ref={menuRef} className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <PiDotsThreeOutlineFill />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Edit
                </button>
                <div className="relative">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                    onMouseEnter={() => setIsSubMenuOpen(true)}
                  >
                    Move to <PiCaretRightBold />
                  </button>
                  {isSubMenuOpen && (
                    <div 
                      className="absolute  top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
                      onMouseLeave={() => setIsSubMenuOpen(false)}
                    >
                      {task.status !== 'inProgress' && (
                        <button
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleMoveTask('inProgress')}
                        >
                          In Progress
                        </button>
                      )}
                      {task.status !== 'done' && (
                        <button
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleMoveTask('done')}
                        >
                          Done
                        </button>
                      )}
                      {task.status !== 'todo' && (
                        <button
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleMoveTask('todo')}
                        >
                          To Do
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-2xl text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className="text-xs text-gray-500">
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
          </span>
        </div>
        <div className="flex items-center">
          {task.assigneeId ? (() => {
            const assignee = useAssigneeStore.getState().assignees.find(a => a.id === task.assigneeId);
            return assignee ? (
              <div className="relative group">
                <img 
                  src={assignee.avatar} 
                  alt={assignee.name}
                  className="w-8 h-8 rounded-full border-2 border-white hover:border-teal-500 transition-colors" 
                />
                <div className="absolute bottom-full mb-2 hidden group-hover:block">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {assignee.name}
                  </div>
                </div>
              </div>
            ) : null;
          })() : (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-xs">👤</span>
            </div>
          )}
        </div>
      </div>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag, index) => (
            <span 
              key={index} 
              className={`px-2 py-1 text-xs rounded-2xl font-medium ${
                tag === 'Design' || tag === 'UX/UI' 
                  ? 'bg-teal-100 text-teal-700' 
                  : tag === 'Development'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <EditTask 
          taskId={task.id} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default TaskCard;