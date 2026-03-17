import { Component, inject, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Student } from '../service/student';
import { students } from '../interface/student';
import { DatePipe } from '@angular/common';
import { SubjectItem } from '../interface/subjects';
import { Subjects } from '../service/subjects';
import { Teacher } from '../service/teacher';
import { Marks } from '../service/marks';

@Component({
  selector: 'app-studentpage',
  imports: [DatePipe],
  templateUrl: './studentpage.html',
  styleUrl: './studentpage.scss'
})
export class Studentpage  implements OnInit{


  student!: students
  chosenSubj: SubjectItem[] = [];
  router = inject(Router)
  studService = inject(Student)
  subjService = inject(Subjects)
  tService = inject(Teacher)
  mService = inject(Marks)

  marksMap: Map<string, number> = new Map()

  constructor(){

  }

  ngOnInit(): void {
    const loggedInStudent = this.studService.getCurrentStudent();

    if (!loggedInStudent) {
      this.router.navigate(['/log-in']);
      return;
    }

    this.student = loggedInStudent;

    const ids =
      this.student.subjectIds ??
      (this.student as any).subjects;

    if (ids?.length) {
      this.loadStudentSubjects(ids);
    }

    if (this.student.subjectIds?.length) {
      this.loadStudentSubjects(this.student.subjectIds);
    }

    this.mService.getMarksForStudent(this.student.id).subscribe(res => {
      res.forEach(mark => {
        this.marksMap.set(mark.subjectId, mark.value)
      })
    })
  }
  getMark(subjectId: string): number | string {
    return this.marksMap.get(subjectId) ?? '—'
  }

  loadStudentSubjects(subjectIds: string[]) {
    this.subjService.getSubjects().subscribe(subjects => {

      const filteredSubjects = subjects.filter(subj =>
        subjectIds.includes(subj.id)
      );

      this.tService.getTeachers().subscribe(teachers => {
        this.chosenSubj = filteredSubjects.map(subj => {
          const teacher = teachers.find(
            t => t.subjectId === subj.id
          );
          return {
            ...subj,
            teacher: teacher
              ? `${teacher.name} ${teacher.lastName}`
              : '—'
          };
        });
      });
    });
  }
  getGPA(): string {
    if (!this.marksMap.size) return '—';

    const values = Array.from(this.marksMap.values());
    const total = values.reduce((sum, val) => sum + val, 0);
    const avg = total / values.length;

    return avg.toFixed(2);
  }
  getGPAColor(): string {
    const gpa = parseFloat(this.getGPA());
    if (isNaN(gpa)) return '#555';
    if (gpa >= 90) return 'green';
    if (gpa >= 70) return 'orange';
    return 'red';
  }
}
