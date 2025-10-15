import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { students } from '../interface/student';

@Injectable({
  providedIn: 'root'
})
export class Student {

  studentURL: string;

  private http = inject(HttpClient);

  constructor() {
    this.studentURL = `http://localhost:3000/`;
  }

  logIn(mail: string, password: string): Observable<students[]> {
    return this.http.get<students[]>(`${this.studentURL}students?mail=${mail}&password=${password}`);
  }


  register(data: students): Observable<students[]>{
    return this.http.post<students[]>(`${this.studentURL}students`, data)
  }

  getSingleStudnet(id: string): Observable<students>{
    return this.http.get<students>(`${this.studentURL}students/${id}`)
  }
}
