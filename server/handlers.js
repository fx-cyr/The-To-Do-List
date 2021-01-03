"use strict";
const { MongoClient, ObjectId } = require("mongodb");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const assert = require("assert");
const { query } = require("express");
require("dotenv").config();

const { MONGO_URI } = process.env;
console.log(MONGO_URI);

const addTask = async (req, res) => {
  console.log(MONGO_URI);
  const { category, date, title, priority, completed } = req.body;
  if (
    (category === undefined || date === undefined || title === undefined,
    priority,
    completed === undefined)
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
    if (result.length > 0) {
    }
  }
  client.close();
};

const getAllTasks = async (req, res) => {
  const { date } = req.params;
  const client = await MongoClient(MONGO_URI, options);
  console.log(client);
  try {
    await client.connect();
    const db = client.db("todo_list");
    const result = await db.collection("tasks").find({ date: date }).toArray();
    //console.log(result);
    if (result.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "Tasks retrieved",
        data: result,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "No tasks retrieved",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const updateStatus = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { _id } = req.params;
  const { completed } = req.body;
  try {
    const query = { _id: ObjectId(_id) };
    const updateDoc = { $set: { completed } };
    console.log(updateDoc);
    await client.connect();
    const db = client.db("todo_list");
    const result = await db.collection("tasks").updateOne(query, updateDoc);
    if (result) {
      return res.status(200).json({
        status: 200,
        message: `${_id} document succesfully updated`,
        data: req.body,
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Failed request",
    });
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = { addTask, getAllTasks, updateStatus };
