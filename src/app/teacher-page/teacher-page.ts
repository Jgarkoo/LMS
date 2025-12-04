import {Component, inject, OnInit} from '@angular/core';
import {Teacher} from '../service/teacher';
import {Router} from '@angular/router';
import {teachers} from '../interface/teacher';

@Component({
  selector: 'app-teacher-page',
  imports: [],
  templateUrl: './teacher-page.html',
  styleUrl: './teacher-page.scss'
})
export class TeacherPage implements OnInit {

  teacher!: teachers
  private tService = inject(Teacher);
  private router = inject(Router);

  ngOnInit() {
    const loggedInTeacher = this.tService.getCurrentTeacher();
    if (loggedInTeacher) {
      this.teacher = loggedInTeacher;
    } else {
      this.router.navigate(['/log-in']);
    }
  }
}
