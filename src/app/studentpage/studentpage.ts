import { Component, inject, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Student } from '../service/student';
import { students } from '../interface/student';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-studentpage',
  imports: [DatePipe],
  templateUrl: './studentpage.html',
  styleUrl: './studentpage.scss'
})
export class Studentpage  implements OnInit{

  student!: students

  private router = inject(Router)
  private service = inject(Student)

  constructor(){

  }

  ngOnInit(): void {
      const loggedInStudent = this.service.getCurrentStudent();
      if (loggedInStudent) {
        this.student = loggedInStudent;
      } else {
        this.router.navigate(['/log-in']);
      }
  }

}
