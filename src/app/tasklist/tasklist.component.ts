import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
 
 import type { ColDef, } from 'ag-grid-community'; 


import {

 GridApi,
GridReadyEvent,
  
} from "ag-grid-community";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasklist',

  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
  standalone: false
})

 

export class TasklistComponent implements OnInit {

  constructor(private taskservice:TaskService,private router:Router){}
  data:any;

 
  
defaultColDef: ColDef = {};

   rtodolist:any;
   private gridApi!: GridApi;
    rowData:any;
   
    getRowId = (params: any) => {
  return params.data.userId;
};

   colDefs: ColDef[] = [
         { field:"userId"},
        { field: "description"},
        { field: "title", 
                       
        },   
        { field: "status",},
         { field: "date",},
          { field: "completedate", valueFormatter: (params) => {
      if (!params.value) return '';
      return new Date(params.value).toISOString().split('T')[0];
    }},
          {
      headerName: "Actions",
      cellRenderer: (params:any) => {
        const div = document.createElement('div');

       
        const editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.style.marginRight = '5px';
        editBtn.addEventListener('click', () => this.editTask(params.data));
        div.appendChild(editBtn);

       
        const delBtn = document.createElement('button');
        delBtn.innerHTML = 'Delete';
        delBtn.addEventListener('click', () => this.deleteTask(params.data.userId));
        div.appendChild(delBtn);

        return div;
      }
    }
   ];

    ngOnInit(): void {

     
    this.rowData=this.taskservice.getTasks();
  }

  fetchapi(){
     this.rowData=this.taskservice.getTasks();
  }

  

   editTask(task: any) {
 
     this.router.navigate(['/dashboard/addtasks', task.userId]);
    
  }

  onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
}


deleteTask(userId: number) {
 
  if (confirm("Are you sure?")) {
   
    const rowToDelete = this.rowData.find((row: any) => row.userId === userId);
    const index = this.rowData.findIndex((row: any) => row.userId === userId);
if (index !== -1) {
  this.rowData.splice(index, 1); 
}

    if (rowToDelete) {
      
      this.gridApi.applyTransaction({ remove: [rowToDelete] });

    
      this.rowData = this.rowData.filter((task: any) => task.userId !== userId);

     
    }
  }
}
}

  


     
  
    
  
 
  


