import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Completed</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.id}</TableCell>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.is_completed ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{task.user_id}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(task)}>Edit</Button>
                                <Button color="error" onClick={() => onDelete(task.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskTable;
