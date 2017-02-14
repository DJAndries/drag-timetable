import TimetableInstance from './instance.js';
import TimetableSpacer from './spacer.js';
import TimetableDragManager from './drag.js';

class TimetableCreator {
  create(container, options) {
    const hoursArray = this._getHoursArray(options.hourStart, options.hourEnd);

    const timetableContainer = document.createElement('div');
    timetableContainer.style.position = 'relative';

    options.hoursArray = hoursArray;

    const tableResult = this._createTable(options);

    timetableContainer.appendChild(tableResult.table);
    timetableContainer.appendChild(tableResult.taskArea);
    container.appendChild(timetableContainer);

    const contextObj = Object.assign(tableResult, options);
    contextObj.tasks = {};

    const instance = new TimetableInstance(contextObj);
    this._initSpacer(instance);
    this._initDrag(instance);
    return instance;
  }

  _createTable(options) {
    const table = document.createElement('table');

    table.setAttribute('class', 'dragtimetable-table');

    options.table = table;
    const taskArea = this._createVerticalTable(options);
    return {table, taskArea};
  }

  _createVerticalTable({orientation, table, hoursArray, quarterHourAreaSize, timeHeaderSize, taskAreaSize}) {
    const taskarea = document.createElement('table');
    taskarea.style.position = 'absolute';
    taskarea.style.top = '2px';
    taskarea.style.left = timeHeaderSize;
    taskarea.style.width = taskAreaSize;
    taskarea.style.borderSpacing = '0px';
    taskarea.style.border = '0px';
    // taskarea.style.padding = '4px';
    for (let hour of hoursArray) {
      const hourBlock = document.createElement('tr');
      const hourHeader = document.createElement('th');
      const hourHeaderText = document.createElement('div');
      const taskCell = document.createElement('td');
      const taskSplitTable = document.createElement('table');


      hourHeaderText.innerHTML = hour;
      hourHeader.style.width = timeHeaderSize;
      hourHeaderText.setAttribute("class", "dragtimetable-headertext");
      hourHeader.appendChild(hourHeaderText);
      hourBlock.appendChild(hourHeader);

      taskSplitTable.style.margin = '0px';
      taskSplitTable.style.padding = '0px';
      taskSplitTable.style.width = taskAreaSize;
      taskSplitTable.setAttribute('class', 'dragtimetable-table');

      for (let i = 0; i < 4; i++) {
        let taskSplitRow = document.createElement('tr');
        let taskSplitCell = document.createElement('td');
        taskSplitRow.style.height = quarterHourAreaSize;
        taskSplitRow.appendChild(taskSplitCell);
        taskSplitTable.appendChild(taskSplitRow);
      }

      taskCell.style.padding = '0px';
      taskCell.appendChild(taskSplitTable);
      hourBlock.appendChild(taskCell);

      table.appendChild(hourBlock);
    }
    return taskarea;
  }

  _getHoursArray(hourStart, hourEnd) {
    const hours = [];
    if (hourStart < hourEnd) {
      for (let i = hourStart; i < hourEnd; i++) {
        hours.push(this._getHourText(i));
      }
    } else {
      for (let i = hourStart; i < 24; i++) {
        hours.push(this._getHourText(i));
      }
      for (let i = 0; i < hourEnd; i++) {
        hours.push(this._getHourText(i));
      }
    }
    return hours;
  }

  _initSpacer(instance) {
    const callbacks = {
      onTaskTimeUpdate: instance.onTaskTimeUpdate.bind(instance),
      getTask: instance.getTask.bind(instance)
    };
    instance.contextObj.spacer = new TimetableSpacer(instance.contextObj.hourStart, instance.contextObj.hourEnd,
      instance.contextObj.taskArea, instance.contextObj.table, instance.contextObj.quarterHourAreaSize, instance.contextObj.orientation, callbacks);
  }

  _initDrag(instance) {
    instance.contextObj.dragManager = new TimetableDragManager(instance.quarterHourAreaSize, instance.contextObj.spacer, instance.contextObj.taskAreaSize);
  }

  _getHourText(i) {
    return (i == 0) ? "12 AM" : (i >= 12 ? (i == 12 ? 12 : i - 12) + " PM" : i + " AM");
  }

}

export default new TimetableCreator();
