import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule,FormGroup,FormControl,Validators, FormsModule } from '@angular/forms';

import {ChangeDetectionStrategy} from '@angular/core';

import {provideNativeDateAdapter} from '@angular/material/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-addtask',
 
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './addtask.component.html',
   providers: [provideNativeDateAdapter()],
  
   styleUrls: ['./addtask.component.css'] ,
   standalone: false
})
export class AddtaskComponent implements OnInit {


   userid:any;
    loginError: boolean = false;

    selected = 'Pending';
     TaskForm!: FormGroup;

  task:any 
  todate:any; 
constructor(private taskservice:TaskService,private router:Router,
  private activateroute:ActivatedRoute){
    this.TaskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required,),
    status: new FormControl('Pending', Validators.required),
    date:new FormControl("",Validators.required),
    completedate:new FormControl(null),
    
  });
  }


ngOnInit(): void {
      
  this.userid=this.activateroute.snapshot.paramMap.get('userId');
  console.log( this.userid)
   if (this.userid) {
     
      const task = this.taskservice.getbyID(this.userid);
      if (task) {
        
       
       this.TaskForm.patchValue(task);
      }
    }


}
  
  onSubmit(){
 
    if(this.userid)
    {
       console.log(this.TaskForm.value)
      
      this.taskservice.updateTask(this.TaskForm.value,this.userid)
      
    }

else
{
    console.log(this.TaskForm.value)
    this.taskservice.save(this.TaskForm.value);
     
        this.router.navigateByUrl('/dashboard/tasklist');
   
  }

}
}