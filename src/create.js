class TimetableCreator {
  create(container, options) {
    const hoursArray = this._getHoursArray(options.dayStart, options.dayEnd);

    const timetableContainer = document.createElement('div');

    options.hoursArray = hoursArray;
    console.log('wow');

    const table = this._createTable(options);

    timetableContainer.appendChild(table);
    container.appendChild(timetableContainer);
  }

  _createTable(options) {
    const table = document.createElement('table');
    table.setAttribute('class', 'dragtimetable-table');
    options.table = table;
    this._createHorizontalTable(options);
    return table;
  }

  _createHorizontalTable({orientation, table, hoursArray, hourAreaSize, timeHeaderSize, taskAreaSize}) {
    console.log('yoyoyo');
    for (let hour of hoursArray) {
      const hourBlock = document.createElement('tr');
      const hourHeader = document.createElement('th');
      const hourHeaderText = document.createElement('div');
      const taskCell = document.createElement('td');
      const taskSplitTable = document.createElement('table');
      let taskSplitRow = document.createElement('tr');
      let taskSplitCell = document.createElement('td');

      hourHeaderText.innerHTML = hour;
      hourHeader.style.width = timeHeaderSize;
      hourHeaderText.setAttribute("class", "dragtimetable-headertext");
      hourHeader.appendChild(hourHeaderText);
      hourBlock.appendChild(hourHeader);

      taskSplitTable.style.margin = '0px';
      taskSplitTable.style.padding = '0px';
      taskSplitTable.style.width = taskAreaSize;
      taskSplitTable.style.height = hourAreaSize;
      taskSplitTable.setAttribute('class', 'dragtimetable-table');
      taskSplitRow.appendChild(taskSplitCell);
      taskSplitTable.appendChild(taskSplitRow);
      taskSplitRow = document.createElement('tr');
      taskSplitCell = document.createElement('td');
      taskSplitRow.appendChild(taskSplitCell);
      taskSplitTable.appendChild(taskSplitRow);
      taskSplitCell = document.createElement('td');
      taskSplitRow = document.createElement('tr');
      taskSplitRow.appendChild(taskSplitCell);
      taskSplitTable.appendChild(taskSplitRow);
      taskSplitCell = document.createElement('td');
      taskSplitRow = document.createElement('tr');
      taskSplitRow.appendChild(taskSplitCell);
      taskSplitTable.appendChild(taskSplitRow);

      taskCell.style.padding = '0px';
      taskCell.appendChild(taskSplitTable);
      hourBlock.appendChild(taskCell);

      table.appendChild(hourBlock);
    }
  }

  _getHoursArray(dayStart, dayEnd) {
    const hours = []
    if (dayStart < dayEnd) {
      for (let i = dayStart; i < dayEnd; i++) {
        hours.push(this._getHourText(i));
      }
    } else {
      for (let i = dayStart; i < 24; i++) {
        hours.push(this._getHourText(i));
      }
      for (let i = 0; i < dayEnd; i++) {
        hours.push(this._getHourText(i));
      }
    }
    return hours;
  }

  _getHourText(i) {
    return (i == 0) ? "12 AM" : (i >= 12 ? (i == 12 ? 12 : i - 12) + " PM" : i + " AM");
  }

}

export default new TimetableCreator();
