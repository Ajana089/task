import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  
   styleUrls:['./dashboard.component.css'],
   standalone: false
})
export class DashboardComponent implements OnInit {

  data:any;

  constructor(private router:Router){}
  
ngOnInit(): void {
  
 let storedUser = localStorage.getItem('user');

if (storedUser) {
  let user = JSON.parse(storedUser);
  this.data=user.username;
}

}

logOut(){
  localStorage.removeItem('user');
  this.data=null;
  this.router.navigateByUrl('/login')
}

}
