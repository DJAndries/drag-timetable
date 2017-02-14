import TimetableCreator from './create.js';

class DragTimetable {
  create(container, options) {
    if (!options || !container) {
      throw 'No options or container';
    }

    const optionsObj = {};

    //horizontal or vertical
    optionsObj.orientation = 'vertical';
    if (options.orientation) {
      optionsObj.orientation = options.orientation;
    }

    // 0 to 23
    optionsObj.hourStart = 8;
    if (options.hourStart) {
      optionsObj.hourStart = options.hourStart;
    }

    // 0 to 23
    optionsObj.hourEnd = 16;
    if (options.hourEnd) {
      optionsObj.hourEnd = options.hourEnd;
    }

    // 0 to 6
    optionsObj.dayStart = 1;
    if (options.dayStart) {
      optionsObj.dayStart = options.dayStart;
    }

    // 0 to 6
    optionsObj.dayEnd = 5
    if (options.dayEnd) {
      optionsObj.dayEnd = options.dayEnd;
    }

    //day or week (maybe month in the future?)
    optionsObj.timeMode = 'day';
    if (options.timeMode) {
      optionsObj.timeMode = options.timeMode;
    }

    //any css size unit
    optionsObj.timeHeaderSize = '100px';
    if (options.timeHeaderSize) {
      optionsObj.timeHeaderSize = options.timeHeaderSize;
    }

    optionsObj.taskAreaSize = '300px';
    if (options.taskAreaSize) {
      optionsObj.taskAreaSize = options.taskAreaSize;
     }

    optionsObj.quarterHourAreaSize = '30px';
    if (options.quarterHourAreaSize) {
      optionsObj.quarterHourAreaSize = options.quarterHourAreaSize;
    }

    optionsObj.dragulaBag = 'task-bag';
    if (options.dragulaBag) {
      optionsObj.dragulaBag = options.dragulaBag;
    }

    optionsObj.is24Clock = false;
    if (options.is24Clock) {
      optionsObj.is24Clock = options.is24Clock;
    }

    return TimetableCreator.create(container, optionsObj);
  }
}

module.exports = new DragTimetable();
