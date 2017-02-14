window.onload = function() {
  var DragTimetable = require('../dist/app.js');

  var instance = DragTimetable.create(document.getElementById("timetable_container"), {});

  instance.addTask({id: 1, start: 9, end: 11, text: 'hello'}, true);
};
