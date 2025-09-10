import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../store/ModalStore';
import { useTaskStore } from '../store/TaskStore';
import { useAssigneeStore } from '../store/AssigneeStore';
import { useTagStore } from '../store/useTagStore';
import { v4 as uuidv4 } from 'uuid';

interface TaskForm {
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  tags: string[];
  assignee: string;
}

const CreateTask: React.FC = () => {
  const [form, setForm] = useState<TaskForm>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    tags: [''],
    assignee: '',
  });

  const [newTag, setNewTag] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const closeModal = useModalStore((state) => state.close);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = () => {
    const newTask = {
      id: uuidv4(),
      title: form.title,
      description: form.description,
      status: "todo" as "todo",
      priority: form.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: form.dueDate,
      tags: form.tags,
      assigneeId: form.assignee || undefined
    };
    
    addTask(newTask);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      const trimmedTag = newTag.trim();
      setForm(prev => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      // Add tag to global tag store
      useTagStore.getState().addTag(trimmedTag);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Task</h2>
        </div>

        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Design the new dashboard"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Add a more detailed description..."
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Due Date and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due date
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select 
                name="priority" 
                value={form.priority} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                    tag === 'Design' 
                      ? 'bg-teal-100 text-teal-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add tag"
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                onClick={addTag}
                className="text-teal-600 hover:text-teal-700 text-xs font-medium"
              >
                + Add Tag
              </button>
            </div>
          </div>

          {/* Assignee Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignee
            </label>
            <div className="flex flex-wrap gap-2">
              {useAssigneeStore.getState().assignees.map((assignee) => (
                <button
                  key={assignee.id}
                  onClick={() => setForm(prev => ({ ...prev, assignee: assignee.id === form.assignee ? '' : assignee.id }))}
                  className={`flex items-center gap-2 p-1 rounded-full ${
                    form.assignee === assignee.id ? 'ring-2 ring-teal-500' : ''
                  }`}
                  title={assignee.name}
                >
                  <img 
                    src={assignee.avatar} 
                    alt={assignee.name}
                    className="w-8 h-8 rounded-full" 
                  />
                </button>
              ))}
              <button 
                onClick={() => setForm(prev => ({ ...prev, assignee: '' }))}
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-teal-500 hover:text-teal-500 ${
                  !form.assignee ? 'ring-2 ring-teal-500' : ''
                }`}
                title="Clear assignee"
              >
                <span className="text-gray-400">×</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 pt-4">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;