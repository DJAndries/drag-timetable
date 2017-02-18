import TimetableTask from './task.js';

export default class TimetableInstance {
  constructor(contextObj) {
    this.contextObj = contextObj;
  }

  setMoveCallback(moveCallback) {
    this.moveCallback = moveCallback;
  }

  addTask(task, isAddingToTimetable) {
    const newTask = new TimetableTask(task, this.contextObj.taskAreaSize);
    this.contextObj.tasks[task.id] = newTask;
    this.contextObj.dragManager.attachToTaskElement(newTask.id, newTask.element);
    if (isAddingToTimetable) {
      this.contextObj.spacer.addToTable(newTask);
    }
    return newTask.element;
  }

  removeTask(taskId) {
    this.contextObj.spacer.removeFromTable(this.contextObj.tasks[taskId]);
    this.contextObj.tasks[taskId] = undefined;
  }

  onTaskTimeUpdate(taskId, startTime, endTime) {
    this.contextObj.tasks[taskId].start = startTime;
    this.contextObj.tasks[taskId].end = endTime;
    if (this.moveCallback) {
      this.moveCallback(this.contextObj.tasks[taskId]);
    }
    this.contextObj.tasks[taskId].updateTaskUI();
  }

  getTask(taskId) {
    return this.contextObj.tasks[taskId];
  }

  getTasks() {
    return this.contextObj.tasks;
  }


}
