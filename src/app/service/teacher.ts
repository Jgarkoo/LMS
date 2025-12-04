import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { teachers } from '../interface/teacher';
import { Observable } from 'rxjs';
import {students} from '../interface/student';

@Injectable({
  providedIn: 'root'
})
export class Teacher {

  teacherURL: string;

  currentTeacher: teachers | null = null;
  private http = inject(HttpClient);

  constructor(){
    this.teacherURL = 'http://localhost:3000/'
  }

  logIn(mail: string, password: string): Observable<teachers[]>{
    return this.http.get<teachers[]>(`${this.teacherURL}teachers`)
  }

  register(data: teachers): Observable<teachers[]>{
    return this.http.post<teachers[]>(`${this.teacherURL}teachers`, data)
  }

  setCurrentteacher(teacher: teachers | null) {
    if (teacher) {
      this.currentTeacher = teacher;
      localStorage.setItem('teacherToken', JSON.stringify(teacher));
    } else {
      this.currentTeacher = null;
      localStorage.removeItem('teacherToken');
    }
  }

  getCurrentTeacher(): teachers | null {
    if (this.currentTeacher) return this.currentTeacher;

    const saved = localStorage.getItem('studentToken');
    if (saved) {
      this.currentTeacher = JSON.parse(saved);
      return this.currentTeacher;
    }
    return null;
  }
}
