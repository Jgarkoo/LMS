import { Component, inject, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Student } from '../service/student';
import { students } from '../interface/student';
import { DatePipe } from '@angular/common';
import {SubjectItem} from '../interface/subjects';
import {Subjects} from '../service/subjects';

@Component({
  selector: 'app-studentpage',
  imports: [DatePipe],
  templateUrl: './studentpage.html',
  styleUrl: './studentpage.scss'
})
export class Studentpage  implements OnInit{

  student!: students
  chosenSubj: SubjectItem[] = [];
  private router = inject(Router)
  private studService = inject(Student)
  private subjService = inject(Subjects)

  constructor(){

  }

  ngOnInit(): void {
    const loggedInStudent = this.studService.getCurrentStudent();

    if (!loggedInStudent) {
      this.router.navigate(['/log-in']);
      return;
    }

    this.student = loggedInStudent;

    if (this.student.subjectIds?.length) {
      this.loadStudentSubjects(this.student.subjectIds);
    }
  }

  private loadStudentSubjects(subjectIds: number[]) {
    this.subjService.getSubjects().subscribe({
      next: (res) => {
        this.chosenSubj = res.filter(subj =>
          subjectIds.includes(subj.id)
        );
      },
      error: (err) => console.error(err)
    });
  }
}
