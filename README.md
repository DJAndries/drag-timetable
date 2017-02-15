# drag-timetable
[![Build Status](https://travis-ci.org/DJAndries/drag-timetable.svg?branch=master)](https://travis-ci.org/DJAndries/drag-timetable) [![npm version](https://badge.fury.io/js/drag-timetable.svg)](https://badge.fury.io/js/drag-timetable)

Simple, customizable & draggable timetable.

## Demo

![alt text](https://github.com/DJAndries/drag-timetable/raw/develop/demo/demo.gif "Demo")

Demo located here: [http://drag-timetable.herokuapp.com](http://drag-timetable.herokuapp.com)

## Features

* Generates table, with custom sizes
* Easy drag-and-drop for changing times of tasks
* Simple API to add/remove/retrieve tasks

### Upcoming Features

* Resizable tasks (change duration of tasks)
* 24 hour time format option
* Ability to drag tasks to/from other containers
* Multiple days (i.e. a full week timetable)
* Horizontal orientation option

## Install

Install via NPM.

```shell
npm install drag-timetable --save
```

Embed style.css in your page.

## Usage

#### `DragTimetable.create(container, options)`

Will return a drag context object. All other methods in this README belong to this context object. The container is an element which will become the parent of the timetable. If you wish to create a timetable with the default options, pass in an empty object into the options parameter. Otherwise, you can specify some or all of the possible options in this parameter.

Here are the default options:

```js
var options = {
  timeHeaderSize: '100px', // width of the time header column
  taskAreaSize: '150px', // width of the task column
  quarterHourAreaSize: '17px', // height of a 15 minute segment
  hourStart = 8, // starting time of timetable, 0 to 23
  hourEnd = 16 // ending time of timetable, 0 to 23
};
```

#### `dragcontext.setMoveCallback(moveCallback)`

Sets the callback which is invoked whenever a task is moved. The updated task object will be passed into the callback.

#### `dragcontext.addTask(task, isAddingToTimetable)`

Attaches a task to the timetable. If `isAddingToTimetable` is true, the task will be added to the timetable DOM (just set this to true for now).

Here is an example of a valid task object:

```js
var task = {
  id: 1, // unique id for task
  start: 9, // starting time for task
  end: 11, // ending time for task
  text: 'Task 1 - Get this stuff done!' // This can be a string or an element
};
```

#### `dragcontext.removeTask(taskId)`

Removes task from timetable.

#### `dragcontext.getTask(taskId)`

Returns task object from timetable;

#### `dragcontext.getTasks()`

Returns an object of task ids mapped to task objects.
