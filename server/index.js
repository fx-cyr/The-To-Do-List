const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const { addTask } = require("./handlers");

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello world");
});

// Endpoint that adds a task to the tasks collection!
app.post("/api/task", addTask);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
