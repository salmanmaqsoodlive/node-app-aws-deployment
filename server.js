const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const TodoTask = require('./models/TodoTask');

dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", async (req, res) => {
    const todos = await TodoTask.find();
    res.send(todos).status(200)
    });

app.post('/', async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content
  }); 
  try {
    await todoTask.save();
    res.send().status(200)

  } catch (err) {
    res.send().status(404)
  }
});

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connected to db!');
  app.listen(PORT, () => console.log('Server Up and running'));
});
