window.onload = function() {
  var DragTimetable = require('../dist/app.js');

  var instance = DragTimetable.create(document.getElementById("timetable_container"), { hourStart: 8, hourEnd: 14 });

  instance.addTask({id: 1, start: 9, end: 11, text: 'Task 1 - Get this stuff done!'}, true);
  instance.addTask({id: 2, start: 12, end: 13, text: 'Task 2 - Get that stuff done!'}, true);

  instance.setMoveCallback(function(task) {
    console.log('task moved: ' + task.id);
  });

  instance.setClickCallback(function(task) {
    console.log('task clicked: ' + task.id);
  });
};
