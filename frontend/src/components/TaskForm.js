import React, { useState } from 'react';
import { TextField, Button, Box, Checkbox, FormControlLabel } from '@mui/material';

const TaskForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(
        initialData || { title: '', description: '', is_completed: false, user_id: '' }
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, is_completed: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
            />
            <FormControlLabel
                control={<Checkbox checked={formData.is_completed} onChange={handleCheckboxChange} />}
                label="Completed"
            />
            <TextField
                label="User ID"
                name="user_id"
                type="number"
                value={formData.user_id}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default TaskForm;
