import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss'
})
export class LogIn implements OnInit {
  
  logInAsStudent: boolean = true;
  logInAsTeacher: boolean = false;
  registerAsStudent: boolean = false;
  
  studentForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });

  ngOnInit() {
    
  }

  showLogIn(){
    this.logInAsStudent = !this.logInAsStudent;
  }
}
