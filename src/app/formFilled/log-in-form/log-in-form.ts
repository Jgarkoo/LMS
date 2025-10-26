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
export class LogInForm  implements OnDestroy{

  logInAsStudent: boolean = false;

  private router = inject(Router)
  private service = inject(Student);
  subscription: Subscription = new Subscription();


  logInStudentForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  logIn() {
    if (!this.logInStudentForm.valid) {
      return;
    }

    const { email, password } = this.logInStudentForm.value;

     const sub = this.service.logIn(email!, password!).subscribe({
      next: (student) => {
        if (student) {
          localStorage.setItem('studentToken', JSON.stringify(student));
          this.service.currentStudent = student;
          this.router.navigate(['/student-page']);
          alert('log in successful!')
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Error logging in');
      }
    });

    this.subscription.add(sub);
  }

  showRegistration(){
    this.logInAsStudent = !this.logInAsStudent;
  }
  
  get email(){
    return this.logInStudentForm.controls['email']
  }

  get pasw(){
    return this.logInStudentForm.controls['password']
  }
}
