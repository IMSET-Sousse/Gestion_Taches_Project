// /frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UsersPage from './pages/UsersPage';
import TasksPage from './pages/TasksPage';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// /frontend/src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/tasks">
          Tasks
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

// /frontend/src/pages/UsersPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Paper, TextField } from '@mui/material';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });

  useEffect(() => {
    axios.get('/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAddUser = () => {
    axios.post('/users', newUser).then((response) => {
      setUsers([...users, response.data.user]);
      setNewUser({ username: '', email: '' });
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          label="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Paper>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <Paper style={{ padding: '10px' }}>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default userPage;

// /frontend/src/pages/TasksPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Paper, TextField, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', is_completed: false, user_id: '' });

  useEffect(() => {
    axios.get('/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const handleAddTask = () => {
    axios.post('/tasks', newTask).then((response) => {
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '', is_completed: false, user_id: '' });
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tasks Management
      </Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          label="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newTask.is_completed}
              onChange={(e) => setNewTask({ ...newTask, is_completed: e.target.checked })}
            />
          }
          label="Completed"
        />
        <TextField
          label="User ID"
          value={newTask.user_id}
          onChange={(e) => setNewTask({ ...newTask, user_id: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Paper>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} md={4}>
            <Paper style={{ padding: '10px' }}>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Typography variant="body2">Completed: {task.is_completed ? 'Yes' : 'No'}</Typography>
              <Typography variant="body2">Assigned to User ID: {task.user_id}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TaskPage;

// /frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
