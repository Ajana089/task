import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  
   styleUrls: ['./login.component.css'] ,
   standalone: false
})
export class LoginComponent implements OnInit{


  flag:boolean=true;
  details: any[] = [];
 
  showtoken: string ='';
  token:string='';
  tokenparent='';
  tokenchild='';
  tokenmob='';
  loginError: boolean = false;
  username1="welcome"
  password1="2026"
  count: number = 0;

  LoginForm: FormGroup;

  constructor(private router: Router){

    this.LoginForm = new FormGroup({
    
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    
  });

  }

  ngOnInit(){
    this.flag=true;

  }

  onSubmit() {


  let user = this.details.find(user =>
  user.username === this.LoginForm.value.username &&
  user.password === this.LoginForm.value.password
);
    
    localStorage.setItem('user', JSON.stringify(user));
    if(user ){
         this.loginError = false;
         this.router.navigateByUrl('/dashboard');
      }

      else{
        this.loginError = true; 
      }
       this.LoginForm.reset();
   
  }
  onRegister(){
  
    this.details.push(this.LoginForm.value);
    console.log(this.details)
    this.flag=true;
     this.LoginForm.reset();

}

 changeAction(){
    this.flag=!this.flag;
  }
}


