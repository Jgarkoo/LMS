import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { students } from '../interface/student';

@Injectable({
  providedIn: 'root'
})
export class Student {

  currentStudent: students | null = null
  studentURL: string;

  private http = inject(HttpClient);
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  private hasToken(): boolean {
    return !!localStorage.getItem('studentToken');
  }
  
  
  constructor() {
    this.studentURL = `http://localhost:3000/students`;
  }

  logIn(mail: string, password: string): Observable<students | null> {
    return this.http
      .get<students[]>(`${this.studentURL}?mail=${mail}&password=${password}`)
      .pipe(
        map((res) => (res.length > 0 ? res[0] : null))
      );
  }

  logout() {
    localStorage.removeItem('studentToken');
    this.isLoggedInSubject.next(false);
  }

  register(data: students): Observable<students>{
    return this.http.post<students>(`${this.studentURL}`, data)
  }

  getSingleStudnet(id: string): Observable<students>{
    return this.http.get<students>(`${this.studentURL}/${id}`)
  }

  getCurrentStudent(): students | null {
    if (this.currentStudent) return this.currentStudent;

    const saved = localStorage.getItem('studentToken');
    if (saved) {
      this.currentStudent = JSON.parse(saved);
      return this.currentStudent;
    }
    return null;
  }
}
