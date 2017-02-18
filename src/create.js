import TimetableInstance from './instance.js';
import TimetableSpacer from './spacer.js';
import TimetableDragManager from './drag.js';
import TimetableUtil from './util.js';

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
    taskarea.style.top = '0px';
    taskarea.style.left = timeHeaderSize;
    taskarea.style.boxSizing = 'border-box';
    taskarea.style.marginLeft = '4px';
    taskarea.style.width = taskAreaSize;
    taskarea.style.borderSpacing = '1px';
    taskarea.style.borderCollapse = 'collapse';

    for (let hour of hoursArray) {
      const hourBlock = document.createElement('tr');
      const hourHeader = document.createElement('th');
      const hourHeaderText = document.createElement('div');
      const taskCell = document.createElement('td');

      hourHeaderText.innerHTML = hour;
      hourHeader.style.width = timeHeaderSize;
      hourHeader.style.padding = '0px';
      hourHeader.setAttribute('rowspan', '4');
      hourHeaderText.setAttribute("class", "dragtimetable-headertext");
      hourHeader.appendChild(hourHeaderText);
      hourBlock.appendChild(hourHeader);
      taskCell.style.width = taskAreaSize;
      taskCell.style.padding = '0px';
      hourBlock.style.height = quarterHourAreaSize;
      hourBlock.appendChild(taskCell);
      table.appendChild(hourBlock);

      for (let i = 0; i < 3; i++) {
        let taskSplitRow = document.createElement('tr');
        let taskSplitCell = document.createElement('td');
        taskSplitCell.style.padding = '0px';
        taskSplitRow.style.height = quarterHourAreaSize;
        taskSplitRow.appendChild(taskSplitCell);
        table.appendChild(taskSplitRow);
      }

    }
    return taskarea;
  }

  _getHoursArray(hourStart, hourEnd) {
    const hours = [];
    if (hourStart < hourEnd) {
      for (let i = hourStart; i < hourEnd; i++) {
        hours.push(TimetableUtil.getHourText(i));
      }
    } else {
      for (let i = hourStart; i < 24; i++) {
        hours.push(TimetableUtil.getHourText(i));
      }
      for (let i = 0; i < hourEnd; i++) {
        hours.push(TimetableUtil.getHourText(i));
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
    const callbacks = {
      onTaskClick: instance.onTaskClick.bind(instance)
    };
    instance.contextObj.dragManager = new TimetableDragManager(instance.quarterHourAreaSize, instance.contextObj.spacer, callbacks, instance.contextObj.clickThreshold);
  }

}

export default new TimetableCreator();
