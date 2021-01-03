const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const { addTask, getAllTasks, updateStatus } = require("./handlers");

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello world");
});

// Endpoint that adds a task to the tasks collection!
app.post("/api/task", addTask);

// Endpoint that retrieves all tasks for a specific date from collection!
app.get("/api/task/:date", getAllTasks);

// Endpoint that updates the status of a task in thecollection!
app.put("/api/task/:_id", updateStatus);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
