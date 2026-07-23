const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://renderapitest-6o04.onrender.com",
  
}));
app.use(express.json());

// ---- simple in-memory "database" ----
let tasks = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Deploy to Render", done: false },
  { id: 3, title: "Test with Postman", done: false },
];
let nextId = 4;

// ---- root / health check ----
app.get("/", (req, res) => {
  res.json({
    message: "Express test API is running 🎉",
    endpoints: {
      health: "GET /health",
      getAllTasks: "GET /api/tasks",
      getTask: "GET /api/tasks/:id",
      createTask: "POST /api/tasks",
      updateTask: "PUT /api/tasks/:id",
      deleteTask: "DELETE /api/tasks/:id",
      echo: "POST /api/echo",
    },
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ---- echo endpoint: handy for testing request bodies/headers in Postman ----
app.post("/api/echo", (req, res) => {
  res.json({
    receivedBody: req.body,
    receivedHeaders: req.headers,
    receivedQuery: req.query,
  });
});

// ---- CRUD: tasks ----

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// GET single task
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// POST create task
app.post("/api/tasks", (req, res) => {
  const { title, done } = req.body;
  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }
  const newTask = { id: nextId++, title, done: Boolean(done) || false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = Boolean(done);

  res.json(task);
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const [deleted] = tasks.splice(index, 1);
  res.json({ message: "Task deleted", task: deleted });
});

// ---- catch-all 404 ----
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
