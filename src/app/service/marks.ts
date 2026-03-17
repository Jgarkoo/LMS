import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mark } from '../interface/marks';
@Injectable({
  providedIn: 'root'
})
export class Marks {

  private http = inject(HttpClient);
  private markURL = 'http://localhost:3000/marks';

  addMark(mark: Mark): Observable<Mark> {
    return this.http.post<Mark>(this.markURL, mark);
  }

  getMarksForTeacher(subjectId: string, teacherId: string): Observable<Mark[]> {
    return this.http.get<Mark[]>(`${this.markURL}?subjectId=${subjectId}&teacherId=${teacherId}`
    );
  }

  getMarksForStudent(studentId: string): Observable<Mark[]> {
    return this.http.get<Mark[]>(`${this.markURL}?studentId=${studentId}`);
  }

  updateMark(mark: Mark) {
    return this.http.put(`${this.markURL}/${mark.id}`, mark);
  }
}
