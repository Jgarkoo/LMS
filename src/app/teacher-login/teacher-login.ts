import {Component, ViewChild} from '@angular/core';
import { TlogInForm } from '../formFilled/teacher-log-in-form/tlog-in-form';

@Component({
  selector: 'app-teacher-login',
  imports: [ TlogInForm ],
  templateUrl: './teacher-login.html',
  styleUrl: './teacher-login.scss'
})
export class TeacherLogin {

      @ViewChild('tlogInFormComp') TlogInFormComponet!: TlogInForm;

      submitLogIn(){
        this.TlogInFormComponet.fetchTeacher();
      }
}
