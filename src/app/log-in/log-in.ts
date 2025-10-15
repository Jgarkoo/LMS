import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Registration } from "../formFilled/registration/registration";
import { LogInForm } from "../formFilled/log-in-form/log-in-form";

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, Registration, LogInForm],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss'
})
export class LogIn implements OnInit {
  
  logInAsStudent: boolean = false;
  regStudent: boolean = false;
  
  @ViewChild('registrationComp') registrationComponent!: Registration;
  @ViewChild('logInFormComp') LogInFormComponent!: LogInForm;

  ngOnInit() {
    
  }

  onSubmit() {
    if (this.logInAsStudent) {
     
      this.registrationComponent.addStudent();
    } else {
      this.LogInFormComponent.logIn();
    }
  }

  showRegistration(){
    this.logInAsStudent = !this.logInAsStudent;
  }
}
