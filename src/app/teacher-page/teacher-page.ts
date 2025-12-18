import {Component, inject, OnInit} from '@angular/core';
import {Teacher} from '../service/teacher';
import {Router} from '@angular/router';
import {teachers} from '../interface/teacher';
import {students} from '../interface/student';
import {Student} from '../service/student';

@Component({
  selector: 'app-teacher-page',
  imports: [],
  templateUrl: './teacher-page.html',
  styleUrl: './teacher-page.scss'
})
export class TeacherPage implements OnInit {

  teacher!: teachers
  students: students[] = [];

  private tService = inject(Teacher);
  private router = inject(Router);
  private studService = inject(Student)

  ngOnInit() {
    const loggedInTeacher = this.tService.getCurrentTeacher();

    if (!loggedInTeacher) {
      this.router.navigate(['/log-in']);
      return;
    }

    this.teacher = loggedInTeacher;

    this.studService
      .getStudentsBySubject(this.teacher.subjectId)
      .subscribe(res => {
        this.students = res;
      });
  }

}
