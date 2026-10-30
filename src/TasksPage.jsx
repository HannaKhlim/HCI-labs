import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Checkbox, Container, IconButton, Paper, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { addTask, updateTask, deleteTask } from "./features/tasks/tasksSlice";

export default function TasksPage() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const error = useSelector((state) => state.tasks.error);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const submit = (event) => {
    event.preventDefault();
    dispatch(addTask({ title, description }));
    if (title.trim()) { setTitle(""); setDescription(""); }
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Task manager</Typography>
      <Paper component="form" onSubmit={submit} sx={{ p: 3, display: "grid", gap: 2, mb: 3 }}>
        <TextField label="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained">Add task</Button>
      </Paper>
      <Box sx={{ display: "grid", gap: 1 }}>
        {tasks.length === 0 ? <Typography color="text.secondary">No tasks yet.</Typography> : tasks.map((task) => (
          <Paper key={task.id} sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox checked={task.completed} onChange={(e) => dispatch(updateTask({ ...task, completed: e.target.checked }))} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ textDecoration: task.completed ? "line-through" : "none", fontWeight: 600 }}>{task.title}</Typography>
              {task.description && <Typography variant="body2" color="text.secondary">{task.description}</Typography>}
            </Box>
            <IconButton aria-label="Delete task" onClick={() => dispatch(deleteTask(task.id))}><DeleteOutlineIcon /></IconButton>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
