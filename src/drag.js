class TimetableDraggable {
  constructor(taskId, element, dragManager, callbacks) {
    this.taskId = taskId;
    this.element = element;
    this.dragManager = dragManager;
    this.isDragging = false;
    this.element.onmousedown = this.onTouchStart.bind(this);
    window.addEventListener('mousemove', this.onTouchMove.bind(this), false);
    window.addEventListener('mouseup', this.onTouchEnd.bind(this), false);
  }

  onTouchStart(ev) {
    this.isDragging = true;
    const boundingRect = ev.currentTarget.getBoundingClientRect();
    this.startOffsetX = ev.clientX - boundingRect.left;
    this.startOffsetY = ev.clientY - boundingRect.top;
    this.startTouchTime = new Date().getTime();
    this.currentGhostElement = this.element.cloneNode(true);
    this.currentGhostElement.style.position = 'absolute';
    this.currentGhostElement.style.left = (ev.pageX - this.startOffsetX) + "px";
    this.currentGhostElement.style.top = (ev.pageY - this.startOffsetY) + "px";
    this.currentGhostElement.style.width = this.element.clientWidth + "px";
    this.currentGhostElement.style.height = this.element.clientHeight + "px";
    document.body.appendChild(this.currentGhostElement);
    this.dragManager.spacer.moveStart(this.taskId);
    return false;
  }

  onTouchEnd(ev) {
    if (this.isDragging) {
      this.isDragging = false;
      if ((new Date().getTime() - this.startTouchTime) < this.dragManager.clickThreshold) {
        this.dragManager.callbacks.onTaskClick(this.taskId);
      }
      if (this.currentGhostElement) {
        this.currentGhostElement.outerHTML = '';
        this.currentGhostElement = null;
      }
      this.dragManager.spacer.moveEnd(this.taskId);
    }
  }

  onTouchMove(ev) {
    if (this.isDragging) {
      if (this.currentGhostElement) {
        this.currentGhostElement.style.left = (ev.pageX - this.startOffsetX) + "px";
        this.currentGhostElement.style.top = (ev.pageY - this.startOffsetY) + "px";
      }
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
      this.dragManager.spacer.moveUpdate(ev.pageY - this.startOffsetY - scrollOffset, this.taskId);
    }
  }
}

export default class TimetableDragManager {

  constructor(unitHeight, spacer, callbacks, clickThreshold) {
    this.callbacks = callbacks;
    this.unitHeight = unitHeight;
    this.spacer = spacer;
    this.clickThreshold = clickThreshold;
    this.taskElements = {};
  }

  attachToTaskElement(taskId, element) {
    const draggable = new TimetableDraggable(taskId, element, this);
    this.taskElements[taskId] = draggable;
  }

  detachToTaskElement(taskId, element) {

  }
}
