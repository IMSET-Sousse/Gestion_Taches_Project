import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UserTable from './components/UserTable';
import TaskTable from './components/TaskTable';
import UserForm from './components/UserForm';
import TaskForm from './components/TaskForm';

const App = () => {
  const [currentView, setCurrentView] = useState('users'); // View toggle: 'users' or 'tasks'

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigation} />
      <div style={{ padding: '20px' }}>
        {currentView === 'users' && (
          <div>
            <h1>Manage Users</h1>
            <UserForm />
            <UserTable />
          </div>
        )}
        {currentView === 'tasks' && (
          <div>
            <h1>Manage Tasks</h1>
            <TaskForm />
            <TaskTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
