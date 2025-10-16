import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../service/student';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in-form.html',
  styleUrl: './log-in-form.scss'
})
export class LogInForm  implements OnInit, OnDestroy{

  logInAsStudent: boolean = false;

  private router = inject(Router)
  private service = inject(Student);
  subscription: Subscription = new Subscription();


  logInStudentForm: FormGroup = new FormGroup({
    mail: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

logIn() {
    if (!this.logInStudentForm.valid) {
      console.warn('Form invalid');
      this.logInStudentForm.markAllAsTouched();
      return;
    }

    const { mail, password } = this.logInStudentForm.value;

    const logInStudent = this.service.logIn(mail!, password!).subscribe({
      next: (res) => {
        if (res.length > 0) {
          console.log('Login successful');
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/student-page']);
          this.logInStudentForm.reset();
        } else {
          console.warn('Invalid email or password');
        }
      },
      error: (err) => {
        console.log('Login failed', err);
      }
    });

    this.subscription.add(logInStudent);
  }

  showRegistration(){
    this.logInAsStudent = !this.logInAsStudent;
  }
  
  get email(){
    return this.logInStudentForm.controls['mail']
  }

  get pasw(){
    return this.logInStudentForm.controls['password']
  }
}
