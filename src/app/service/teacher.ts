import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { teachers } from '../interface/teacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Teacher {
  
  teacherURL: string;

  private http = inject(HttpClient);

  constructor(){
    this.teacherURL = 'http://localhost:3000/'
  }

  logIn(): Observable<teachers[]>{
    return this.http.get<teachers[]>(`${this.teacherURL}students`)
  }

  register(data: teachers): Observable<teachers[]>{
    return this.http.post<teachers[]>(`${this.teacherURL}students`, data)
  }

  getSingleStudnet(id: string): Observable<teachers>{
    return this.http.get<teachers>(`${this.teacherURL}students/${id}`)
  }
}