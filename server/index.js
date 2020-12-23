const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
