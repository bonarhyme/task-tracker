import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskServices: TaskService) {}

  ngOnInit(): void {
    this.taskServices.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    this.taskServices.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((x) => x.id !== task.id);
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;

    this.taskServices.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskServices.addTask(task).subscribe((_task) => {
      this.tasks.push(_task);
    });
  }
}
