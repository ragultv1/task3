// pages/Home.tsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import { useModalStore } from '../store/ModalStore';


const HomePage: React.FC = () => {
  const { isOpen } = useModalStore();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Task List */}
          <main className="flex-1 overflow-auto">
            <TaskList />
          </main>
        </div>
        
        {/* Modal */}
        {isOpen && <CreateTask />}
      </div>
    </DndProvider>
  );
};

export default HomePage;