#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const home = os.homedir();
const file = ".task-tracker.json";
const filePath = path.join(home, file);
//console.log(filePath);

const initFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({tasks: []}, null, 2));
  }
}

const addTask = (task) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const taskId = data.tasks.length + 1;
  const newTask = {
    id: taskId,
    task,
    isDone: false,
    inProgress: false,
  };
  data.tasks.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`${task} added successfully with id: ${taskId}`);
}

const updateTask = (id, task) => {
  if (!task) console.log("Please enter the updated task");
  const data = JSON.parse(fs.readFileSync(filePath));
  const oldTask = data.tasks.find(task => task.id === id);
  if (!oldTask){
    console.log("Task does not exist");
  }
  oldTask.task = task;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`${task} updated successfully with id: ${oldTask.id}`);
}

const markDone = (id) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const task = data.tasks.find(task => task.id === id);
  task.isDone = true,
  task.inProgress = false,
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`${task.task} marked done successfully with id: ${task.id}`);
}

const markProgress = (id) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const task = data.tasks.find(task => task.id === id);
  task.isDone = false,
  task.inProgress = true,
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`${task.task} marked in-Progress successfully with id: ${task.id}`);
}

const deleteTask = (id) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  data.tasks = data.tasks.filter(task => task.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`id: ${id} deleted successfully`);
}

const listTasks = (status) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  let tasks;
  if (status === "done"){
    tasks = data.tasks.filter((task) => task.isDone === true);
  }
  else if (status === "in-progress") {
    tasks = data.tasks.filter( item => item.inProgress === true);
  }
  else if (status === "not-done") {
    tasks = data.tasks.filter( task => task.isDone === false && task.inProgress === false)
  }
  else{
    tasks = data.tasks;
  }
  tasks.forEach(({id, task, isDone, inProgress}) => {
    let status;
    if (isDone === false && inProgress === false) status = "not-done"
    else if (isDone) status = "done";
    else status = "in-progress";
    const idCol = 7;
    const statusCol = 21;
    const taskCol = 40;

    const idStr = `id: ${id}`.padEnd(idCol);
    const statusStr = `status: ${status}`.padEnd(statusCol);
    const taskStr = `task: ${task}`.padEnd(taskCol);
    console.log(`${idStr} ${taskStr} ${statusStr}`);
  });
}

const main = () => {
  initFile();
  const [command, ...args] = process.argv.slice(2);
  switch(command) {
    case 'add':
      addTask(args[0]);
      break;
    case 'update':
      updateTask(parseInt(args[0]), args[1]);
      break;
    case "mark-in-progress":
      markProgress(parseInt(args[0]));
      break;
    case "mark-done":
      markDone(parseInt(args[0]));
      break;
    case "delete":
      deleteTask(parseInt(args[0]));
      break;
    case "list":
      listTasks(args[0]);
      break;
    default:
      console.log('Unknown Command');
  }
}

main();
