import {Component, inject, OnDestroy} from '@angular/core';
import {Teacher} from '../../service/teacher';
import {FormGroup, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {teachers} from '../../interface/teacher';

@Component({
  selector: 'app-tlog-in-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './tlog-in-form.html',
  styleUrl: './tlog-in-form.scss'
})
export class TlogInForm implements OnDestroy {


  private tService = inject(Teacher)
  private router = inject(Router);

  subscription: Subscription = new Subscription();

  teacherLogInForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  })

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchTeacher(){
    if(!this.teacherLogInForm.valid) return;

    const { mail, password } = this.teacherLogInForm.value;

    const sub = this.tService.logIn(mail!, password!).subscribe({next: (res: teachers[]) =>{
        if (res.length > 0) {
          const currentTeacher = res[0];
          this.router.navigate(['/teacher-page']);
          this.tService.setCurrentTeacher(currentTeacher);
        }
      }})

    this.subscription.add(sub);
  }

  get mail() {
    return this.teacherLogInForm.controls['email'];
  }
  get password() {
    return this.teacherLogInForm.controls['password'];
  }
}
