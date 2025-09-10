// components/Sidebar.tsx
import React from 'react';
import { useFilterStore } from '../store/FilterStore';
import { useAssigneeStore } from '../store/AssigneeStore';
import { useTagStore } from '../store/useTagStore';

const Sidebar: React.FC = () => {
  const { status, setStatus } = useFilterStore();
  const { priority, setPriority } = useFilterStore();
  const { tags, setSelectedTag } = useTagStore();

  const getButtonStyles = (buttonStatus: string) => {
    const isActive = status === buttonStatus;
    return `flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
      isActive 
        ? 'bg-teal-500 text-white hover:bg-teal-600' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;
  };
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6">
        <div className='flex items-center gap-3 mb-8 '>
                    
      <h1 className="text-2xl font-bold text-gray-900 ">Taskify</h1>
        </div>

      
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">FILTERS</h2>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Status</h3>
        <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setStatus('ALL')}
              className={getButtonStyles('ALL')}
            >
              All
            </button>
            <button 
              onClick={() => setStatus('TODO')}
              className={getButtonStyles('TODO')}
            >
              To Do
            </button>
            <button 
              onClick={() => setStatus('IN_PROGRESS')}
              className={getButtonStyles('IN_PROGRESS')}
            >
              Progress
            </button>
            <button 
              onClick={() => setStatus('DONE')}
              className={getButtonStyles('DONE')}
            >
              Done
            </button>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Priority</h3>
        <select 
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW')}
          className="w-full p-2 border rounded-md text-sm bg-white cursor-pointer hover:border-gray-400 "
        >
          <option value="ALL">All</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Tags</h3>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1  rounded-lg hover:bg-teal-400 "
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Assignee</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => useAssigneeStore.getState().setSelectedAssignee('ALL')}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
              useAssigneeStore((state) => state.selectedAssignee) === 'ALL'
                ? ''
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            <span className="text-sm">All</span>
          </button>
          {useAssigneeStore((state) => state.assignees).map((assignee) => (
            <button
              key={assignee.id}
              onClick={() => useAssigneeStore.getState().setSelectedAssignee(assignee.id)}
              className={`relative group ${
                useAssigneeStore((state) => state.selectedAssignee) === assignee.id
                  ? 'w-8 h-8 rounded-full ring-2 ring-teal-500 object-cover'
                  : ''
              }`}
              title={assignee.name}
            >
              <img 
                src={assignee.avatar} 
                alt={assignee.name}
                className="w-8 h-8 rounded-full hover:ring-2 hover:ring-gray-300" 
              />
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
                <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {assignee.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;