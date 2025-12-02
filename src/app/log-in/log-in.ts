import { Component, ViewChild, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Registration } from "../formFilled/registration/registration";
import { LogInForm } from "../formFilled/log-in-form/log-in-form";
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, Registration, LogInForm],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss'
})
export class LogIn {
  
  logInAsStudent: boolean = false;
  regStudent: boolean = false;
  
  @ViewChild('registrationComp') registrationComponent!: Registration;
  @ViewChild('logInFormComp') LogInFormComponent!: LogInForm;

  private router = inject(Router)

  onLoginSubmit() {
    this.LogInFormComponent.logIn();
  }

  onRegisterSubmit() {
    this.registrationComponent.addStudent();
    this.logInAsStudent = !this.logInAsStudent;
  }

  showRegistration(){
    this.logInAsStudent = !this.logInAsStudent;
  }
}
