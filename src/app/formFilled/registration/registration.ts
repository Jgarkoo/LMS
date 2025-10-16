import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { students } from '../../interface/student';
import { Student } from '../../service/student';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration implements OnInit, OnDestroy{

  registerContent: boolean = false;
  logInAsStudent: boolean = false;

  private router = inject(Router)
  private service = inject(Student);
  subscription: Subscription = new Subscription();

  registerStudentForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    date: new FormControl('',[Validators.required, Validators.minLength(3)]),
    grade: new FormControl('',[Validators.required, Validators.minLength(1)]),
    mail: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
    this.addStudent();
  } 
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  addStudent() {
    if (!this.registerStudentForm.valid) {
      console.warn('Form invalid');
      this.registerStudentForm.markAllAsTouched();
      return;
    }

    const request: students = {
      ...(this.registerStudentForm.value as students)
    };

    const regStud = this.service.register(request).subscribe({
      next: (res) => {
        console.log('Registered successfully');
        this.registerStudentForm.reset();
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/student-page']);
      },
      error: (err) => {
        console.log('Registration failed', err);
      }
    });

    this.subscription.add(regStud);
  }

  showRegistration(){
    this.logInAsStudent = !this.logInAsStudent;
  }

  get name(){
    return this.registerStudentForm.controls['name']
  }

  get lastname(){
    return this.registerStudentForm.controls['lastName']
  }

  get email(){
    return this.registerStudentForm.controls['mail']
  }

  get pasw(){
    return this.registerStudentForm.controls['password']
  }

  get cpasw(){
    return this.registerStudentForm.controls['confirmPassword']
  }

  get date(){
    return this.registerStudentForm.controls['date']
  }

  get grade(){
    return this.registerStudentForm.controls['grade']
  }
}
