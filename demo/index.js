window.onload = function() {
  var DragTimetable = require('../dist/app.js');

  DragTimetable.create(document.getElementById("timetable_container"), {});
};
