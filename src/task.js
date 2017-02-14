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
    this.element.style.padding = '10px';
    const actualTask = document.createElement('div');
    actualTask.setAttribute('class', 'dragtimetable-task');
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    if (this.text) {
      actualTask.innerHTML = this.text;
    }
    this.element.appendChild(actualTask);
  }
}
