"use strict";
const { MongoClient, ObjectId } = require("mongodb");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const assert = require("assert");
require("dotenv").config();

const { MONGO_URI } = process.env;
console.log(MONGO_URI);

const addTask = async (req, res) => {
  console.log(MONGO_URI);
  const { category, date, title, priority, status } = req.body;
  if (
    (category === undefined || date === undefined || title === undefined,
    priority,
    status === undefined)
  ) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: "Missing information - task not added",
    });
    return;
  }
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("todo_list");
    const result = await db.collection("tasks").insertOne(req.body);
    assert.strictEqual(1, result.insertedCount);
    if (result) {
      return res.status(201).json({
        status: 201,
        data: req.body,
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Failed request to add task",
    });
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

module.exports = { addTask };
