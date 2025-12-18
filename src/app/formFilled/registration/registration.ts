import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { students } from '../../interface/student';
import { Student } from '../../service/student';
import {Subscription, take} from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatDatepicker, MatDatepickerToggle, MatDatepickerInput } from '@angular/material/datepicker';
import { SubjectItem } from '../../interface/subjects';
import { Subjects } from '../../service/subjects';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, MatSelect, MatOption, MatDatepicker, MatDatepickerToggle, MatDatepickerInput],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration implements OnInit, OnDestroy{

  logInAsStudent: boolean = false;
  subjectList: SubjectItem[] = [];

  private service = inject(Student)
  private subjService = inject(Subjects)
  subscription: Subscription = new Subscription()

  registerStudentForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    date: new FormControl('',[Validators.required, Validators.minLength(3)]),
    grade: new FormControl('',[Validators.required, Validators.minLength(1)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    subjectIds: new FormControl<number[]>([], Validators.required)
  });

  ngOnInit(): void {
    this.fetchSubjects();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addStudent() {
    if (!this.registerStudentForm.valid) return;

    const {
      confirmPassword,
      ...formValue
    } = this.registerStudentForm.value;

    const newStudent: students = {
      ...formValue,
      subjectIds: formValue.subjectIds
    };

     this.service.register(newStudent).pipe(take(1)).subscribe({
      next: () => {
        this.registerStudentForm.reset();
      },
      error: (err) => console.log(err)
    });

  }

  fetchSubjects() {
    const sub = this.subjService.getSubjects().subscribe({
      next: (res: SubjectItem[]) => {
        this.subjectList = res;
      },
      error: (err) => console.log(err)
    });

    this.subscription.add(sub);
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
    return this.registerStudentForm.controls['email']
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
