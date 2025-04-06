import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'kanban-board',
    templateUrl: './kanbanBoard.component.html',
    styleUrls: ['./kanbanBoard.component.scss'],
    standalone: false
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName: string = '';

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  createNewTask = () => {
    if(this.taskName) {
      if(this.tasks.find(task => task.name === this.taskName)) {
        alert('Task with this name already exists. Please enter a different name.');
      } else {
        const newTask: Task = { name: this.taskName, stage: 0 };
        this.tasks.push(newTask);
        this.taskName = null;
        this.configureTasksForRendering();
      }
    };
  };

  moveTaskForward = (taskName: string) => {
    let task = this.tasks.find(task => task.name === taskName);
    if(task.stage < 3) {
      task.stage++;
      this.configureTasksForRendering();
    };
  }

  moveTaskBackward = (taskName: string) => {
    let task = this.tasks.find(task => task.name === taskName);
    if(task.stage > 0) {
      task.stage--;
      this.configureTasksForRendering();
    };
  }

  deleteTask = (taskName: string) => {
    this.tasks = this.tasks.filter(task => task.name !== taskName);
    this.configureTasksForRendering();
  }

  isBackButtonDisabled = (taskName: string) => {
    let task = this.tasks.find(task => task.name === taskName);
    if(task.stage === 0) {
      return true;
    }
    return false;
  }

  isForwardButtonDisabled = (taskName: string) => { 
    let task = this.tasks.find(task => task.name === taskName);
    if(task.stage === 3) {
      return true;
    }
    return false;
  }
}

interface Task {
  name: string;
  stage: number;
}