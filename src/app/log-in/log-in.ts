import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Registration } from "../formFilled/registration/registration";
import { LogInForm } from "../formFilled/log-in-form/log-in-form";
import { Router } from '@angular/router';

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

  private router = inject(Router)

  ngOnInit() {}

   onLoginSubmit() {
    this.LogInFormComponent.logIn();
  }

  onRegisterSubmit() {
    this.registrationComponent.addStudent();
  }

  showRegistration(){
    this.logInAsStudent = !this.logInAsStudent;
  }
}
