const express = require('express');
const app = express();
const port = 5000;
const path = require('path'); // Import the 'path' module


app.use(express.static(path.join(__dirname)));
app.use(express.json());

const tasks = [];

app.post('/addTask', (req, res) => {
    const taskText = req.body.taskText;
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        res.status(201).json({ message: 'Task added successfully.' });
    } else {
        res.status(400).json({ error: 'Task text is required.' });
    }
});

app.get('/tasks', (req, res) => {
    res.json({ tasks });
});

app.patch('/updateTask/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (Number.isNaN(index) || index < 0 || index >= tasks.length) {
        res.status(400).json({ error: 'Invalid task index.' });
    } else {
        tasks[index].completed = req.body.completed;
        res.json({ message: 'Task updated successfully.' });
    }
});

app.delete('/deleteTask/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (Number.isNaN(index) || index < 0 || index >= tasks.length) {
        res.status(400).json({ error: 'Invalid task index.' });
    } else {
        tasks.splice(index, 1);
        res.json({ message: 'Task deleted successfully.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});