import { CommonModule, NgClass } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../service/student';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  imports: [ReactiveFormsModule, CommonModule, NgClass],
  templateUrl: './log-in-form.html',
  styleUrl: './log-in-form.scss'
})
export class LogInForm  implements OnDestroy{

  logInAsStudent: boolean = false;

  subscription: Subscription = new Subscription();

  private router = inject(Router)
  private service = inject(Student)

  logInStudentForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logIn() {
    if (!this.logInStudentForm.valid) return;

    const { mail, password } = this.logInStudentForm.value;

   const sub =  this.service.logIn(mail!, password!).subscribe({
      next: (res) => {

        if (res.length > 0) {
          const loggedUser = res[0];
          this.router.navigate(['/student-page']);
          this.service.setCurrentStudents(loggedUser);
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.log('Login failed', err);
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
