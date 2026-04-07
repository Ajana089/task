import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  userId:any;
  selectedtask:any;
  constructor(private router:Router) { }
  tasks = [
  {
    userId: 1,
    status: 'Completed',
    date: new Date('2026-02-20'),
    title: 'Finish Angular Service',
    description: 'Create and test TaskService with BehaviorSubject.',
    completedate:''
  },
  {
    userId: 2,
    status: 'Pending',
    date: new Date('2026-02-25'),
    title: 'Design Task Form UI',
    description: 'Align all Angular Material form fields with equal width.',
    completedate:''
  },
  {
    userId: 3,
    status: 'Completed',
    date: new Date('2026-02-26'),
    title: 'Implement HTTP Integration',
    description: 'Connect frontend to backend using provideHttpClient.',
    completedate:''
  }
];


id=this.tasks.length+1;
updatedid:any;



tasks$ = new BehaviorSubject(this.tasks);

  save(data:any){

  data.userId=this.id;
    
  this.tasks.push(data);
 
  console.log(this.tasks)

  }

  getTasks(){
 
    return this.tasks;
  }
  updateTask(data:any,userid:any){

   
    const index = this.tasks.findIndex(t => t.userId == userid);
      data.userId=+userid;

     
  if (index !== -1) {
   
  
     if (index !== -1) {
  this.tasks[index].userId = data.userId;
  this.tasks[index].title = data.title;
  this.tasks[index].description = data.description;
  this.tasks[index].status = data.status;
  this.tasks[index].date = data.date;
//  let date=new Date(data.completedate)
  this.tasks[index].completedate = data.completedate;
}


    
  
     this.router.navigateByUrl('/dashboard/tasklist')
  }
}



deleteById(userId: number) {
  const updated = this.tasks.filter(
    task => task.userId !== userId
  );

  
}
  getbyID(id:any){

   this.updatedid= id;

  this.selectedtask = this.tasks.find(t => t.userId == id);
  console.log(this.selectedtask)
  return this.selectedtask;
  }
}
