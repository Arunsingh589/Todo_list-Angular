import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  //create Variables for hold value

  taskObj: Task = new Task();
  taskArr: Task[] = [];


  addTaskData: string = '';
  editTaskData: string = '';



  constructor(private api: TaskService) { }

  ngOnInit(): void {
    this.editTaskData = '';
    this.addTaskData = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();

  }


  //create Task method

  addTask() {
    this.taskObj.task = this.addTaskData;
    this.api.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskData = ''
    }, err => {
      alert(err);
    })

  }
  // get all task data

  getAllTask() {
    this.api.getAllTask().subscribe(res => {
      this.taskArr = res;

    }, err => {
      alert('Unable To Find Task')
    })
  }
  //edit Todo Task

  editTask() {
    this.taskObj.task = this.editTaskData;
    this.api.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert('Unable to Update Task')
    })
  }

  //delete task after complete

  deleteTask(task:Task){
    this.api.deleteTask(task).subscribe(res=>{
       this.ngOnInit();
    },err=>{
      alert('Fail To Delete Task')
    })

  }
  //edit property
  callEdit(task:Task){
    this.taskObj = task;
    this.editTaskData = task.task;
  }


}
