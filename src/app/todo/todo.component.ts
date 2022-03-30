import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm !:FormGroup;
  taskes:ITask[]=[];
  inprogress:ITask[]=[];
  done:ITask[]=[];
  updateId !:any;
  isEdit=false;
  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item:['',Validators.required]
    })
  }
  addTask(){
    this.taskes.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }
  updateTask(){
    this.taskes[this.updateId].description=this.todoForm.value.item;
    this.taskes[this.updateId].done=false;
    this.todoForm.reset();
    this.updateId=undefined;
    this.isEdit=false;
  }
  onEdit(item:ITask,i){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId=i;
    this.isEdit=true;
  }
  deleteTask(i){
    this.taskes.splice(i,1);
  }
  deleteInprogress(i){
    this.inprogress.splice(i,1);
  }
  deleteDoneTask(i){
    this.done.splice(i,1);

  }
  
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
