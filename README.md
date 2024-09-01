# Project Title

Task Tracker CLI.

## Description

This tool lets you track your todo/tasks in the cli. With this tool you can 
1. Add a task.
2. Update a task.
3. Update status of the task.
4. Delete a task.
5. List all the tasks and add status filters as well.

## Getting Started

### Dependencies

* You will need terminal, with node.js version 16 and above.
* (optional) To add the to your path so that you can globally you need root privilages. 

### Installing and Executing program

* Open the terminal and clone this repo
```
git clone https://github.com/devshDotTech/github-activity.git
```
* Go to the cloned folder and run the js file
```
node index.js <command>
```
Replace the command with 
1. add
2. update <id> <new task>
3. delete <id>
4. mark-done <id>
5. mark-progress <id>
6. list [done | not-done | in-progress]

* (optional) To add to your path
```
sudo ln -s /path/to/your/file/file.js /usr/local/bin/task-tracker
```
* Then simply execute the task-tracker from anywhere
```
task-tracker list
```

```
#output
id: 1   task: hello earth and world              status: not-done
id: 2   task: hello Asia                         status: done
id: 3   task: hello India                        status: in-progress

```

## Acknowledgments

Inspiration and Solution to.
* [roadmap.sh/task-tracker](https://roadmap.sh/projects/task-tracker)
