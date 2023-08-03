import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Task } from '../model/task';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    
  taskObj: Task = new Task()
  taskArr: Task[] = []

    addTaskValue: string = ""
    editTasValue: string = ""

    constructor (private crudService: CrudService){}






          ngOnInit(): void {
            
            this.editTasValue= ""
            this.taskObj = new Task()
            this.taskArr = []
            this.getAllTasks()
          }


          getAllTasks(){
            this.crudService.getAllTasks().subscribe(res =>{
              this.taskArr = res
              
            }, error => {
              alert("Unkown it error")
            })
          }


          addTask(){
              if(this.addTaskValue == "" ){
                alert("enter your Task")
              }else{
                this.taskObj.task_name = this.addTaskValue
            this.crudService.addTask(this.taskObj).subscribe( res => {
              this.ngOnInit()
            this.addTaskValue = ""   
            }, (error) => {
              alert(error)
            })
              }
            
          }

          editTask(){
            this.taskObj.task_name = this.editTasValue
            this.crudService.editTask(this.taskObj).subscribe(res=> {
              this.ngOnInit()
            }, error => {
              alert("it is falsch")
            })
          }

          deleteTask(etask: Task){
            
            this.crudService.deleteTask(etask).subscribe(res => {
              this.ngOnInit()
              console.log(res);
              
            }, error => {
              alert("Error")
            })
          }

          call(etask: Task){
            this.taskObj = etask;
            this.editTasValue = etask.task_name
          }
          
}
