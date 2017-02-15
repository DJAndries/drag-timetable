import TimetableUtil from './util.js';

export default class TimetableTask {
  constructor(task, taskAreaSize) {
    this.id = task.id;
    this.start = task.start;
    this.end = task.end;
    this.text = task.text;
    this._initTaskElement(taskAreaSize);
  }

  _initTaskElement(taskAreaSize) {
    this.element = document.createElement('div');
    this.actualTask = document.createElement('div');
    this.actualTask.setAttribute('class', 'dragtimetable-task');
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    this.element.style.boxSizing = 'border-box';
    this.element.style.paddingLeft = '10px';
    this.element.style.paddingRight = '10px';
    this.element.style.position = 'relative';

    this.updateTaskUI();

    this.element.appendChild(this.actualTask);
  }

  updateTaskUI() {
    if (this.text) {
      this.actualTask.innerHTML = this.text;
    }

    this.actualTask.appendChild(this.getTimeElement());
  }

  getTimeElement() {
    const timeElement = document.createElement('div');
    timeElement.innerHTML = '&#x23f0; ' + TimetableUtil.getHourText(this.start) + ' - ' + TimetableUtil.getHourText(this.end);
    timeElement.style.position = 'absolute';
    timeElement.style.bottom = '0px';
    timeElement.style.paddingBottom = '3px';
    return timeElement;
  }
}
