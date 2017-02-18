export default class TimetableSpacer {
  constructor(hourStart, hourEnd, taskArea, table, unitHeight, orientation, callbacks) {
    this.hourStart = hourStart;
    this.hourEnd = hourEnd;
    this.taskArea = taskArea;
    this.table = table;
    this.unitHeight = unitHeight;
    this.orientation = orientation;
    this.callbacks = callbacks;
    this.spacerIdToElementArray = [];
    this.timeToSpacerMap = {};
    this.spacerToTimeMap = {};
    this._initSpacers();
  }

  moveStart(selectedTaskId) {
    const selectedTask = this.callbacks.getTask(selectedTaskId);
    const boundary = this.timeToSpacerMap[selectedTask.start].boundary
    this.currentAvailSlot = {spacerId: boundary[0], lastSpacerId: boundary[1]};
    this.removeFromTable(selectedTask);
  }

  moveUpdate(mouseOffset, selectedTaskId) {
    const selectedTask = this.callbacks.getTask(selectedTaskId);
    const availSlotResult = this.getClosestAvailableSlot(mouseOffset, selectedTask);
    if (availSlotResult) {
      this.currentAvailSlot = availSlotResult;
    }
  }

  moveEnd(selectedTaskId) {
    const selectedTask = this.callbacks.getTask(selectedTaskId);
    if (!this.currentAvailSlot) {
      return;
    }
    this.addToTable(selectedTask, this.currentAvailSlot.spacerId, this.currentAvailSlot.lastSpacerId);
    this.callbacks.onTaskTimeUpdate(selectedTask.id, this.spacerToTimeMap[this.currentAvailSlot.spacerId],
      this.spacerToTimeMap[this.currentAvailSlot.lastSpacerId] + 0.25);
  }


  getClosestAvailableSlot(mouseOffset, selectedTask) {
    const spacerLength = Math.floor((selectedTask.end - selectedTask.start) * 4.0);
    for(let i = this.spacerIdToElementArray.length - 1; i >= 0; i--) {
      const spacerElement = this.spacerIdToElementArray[i];
      if (spacerElement.style.display === 'none') {
        continue;
      }
      const clientRect = spacerElement.getBoundingClientRect();
      const spacerPosition = this.orientation === 'horizontal' ? clientRect.left : clientRect.top;
      if (i == 0 || mouseOffset > spacerPosition) {
        let conflictDetected = false;
        let lastSpacerId = 0;
        for (let f = i; f < i + spacerLength; f += 1) {
          const currTime = this.spacerToTimeMap[f];
          if (this.timeToSpacerMap[currTime] === undefined || this.timeToSpacerMap[currTime] === null ||
              (this.timeToSpacerMap[currTime] && this.timeToSpacerMap[currTime].taskId
              && this.timeToSpacerMap[currTime].taskId !== selectedTask.id)) {
            conflictDetected = true;
          }
          lastSpacerId = f;
        }
        if (!conflictDetected) {
          return {spacerId: i, lastSpacerId};
        }
      }
    }
    return false;
  }

  addToTable(task, availSlotStart, availSlotEnd) {
    let taskStart = task.start;
    let taskEnd = task.end;
    if (availSlotStart !== undefined && availSlotStart !== null && availSlotEnd !== undefined && availSlotEnd !== null) {
      taskStart = this.spacerToTimeMap[availSlotStart];
      taskEnd = this.spacerToTimeMap[availSlotEnd + 1];
    }

    for (let i = 0.0 + taskStart; i < taskEnd; i += 0.25) {
      if (this.timeToSpacerMap[i] && this.timeToSpacerMap[i].taskId) {
        throw 'No available slots!';
      }
    }
    const startSpacerId = this.timeToSpacerMap[taskStart];
    const endSpacerId = this.timeToSpacerMap[taskEnd - 0.25];
    for (let i = 0.0 + taskStart; i < taskEnd; i += 0.25) {
      const spacerId = this.timeToSpacerMap[i];
      this.timeToSpacerMap[i] = {taskId: task.id, boundary: [this.timeToSpacerMap[taskStart], this.timeToSpacerMap[taskEnd - 0.25]], availableValue: spacerId};
      if (i == taskStart) {
        this.spacerIdToElementArray[spacerId].style.display = '';
        this.spacerIdToElementArray[spacerId].appendChild(task.element);
        this.spacerIdToElementArray[spacerId].setAttribute('rowspan', '' + (endSpacerId - startSpacerId + 1));
      } else {
        this.spacerIdToElementArray[spacerId].style.display = 'none';
      }
    }
  }

  removeFromTable(task) {
    const startSpacerId = this.timeToSpacerMap[task.start];
    const endSpacerId = this.timeToSpacerMap[task.end - 0.25];
    for (let i = 0.0 + task.start; i < task.end; i += 0.25) {
      const spacerObj = this.timeToSpacerMap[i];
      if (!spacerObj.taskId) {
        continue;
      }
      this.timeToSpacerMap[i] = spacerObj.availableValue;
      const spacerId = spacerObj.availableValue;
      if (i == task.start) {
        this.spacerIdToElementArray[spacerId].removeChild(this.spacerIdToElementArray[spacerId].firstChild);
        this.spacerIdToElementArray[spacerId].setAttribute('rowspan', '1');
      } else {
        this.spacerIdToElementArray[spacerId].style.display = '';
      }
    }
  }

  _initSpacers() {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    for (let i = 0.0 + this.hourStart; i < this.hourEnd; i += 0.25) {
      const rowElement = document.createElement('tr');
      const spaceElement = document.createElement('td');
      rowElement.style.height = this.unitHeight;
      spaceElement.setAttribute('class', 'dragtimetable-spacer');
      if (isFirefox) {
        spaceElement.style.height = '100%';
      }
      this.spacerIdToElementArray.push(spaceElement);
      this.timeToSpacerMap[i] = this.spacerIdToElementArray.length - 1;
      this.spacerToTimeMap[this.spacerIdToElementArray.length - 1] = i;
      rowElement.appendChild(spaceElement);
      this.taskArea.appendChild(rowElement);
    }
    this.spacerToTimeMap[this.spacerIdToElementArray.length] = this.hourEnd;
    window.addEventListener('resize', () => {
      this.taskArea.style.height = this.table.clientHeight + "px";
    });
    this.taskArea.style.height = this.table.clientHeight + "px";
  }
}
