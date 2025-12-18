import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SubjectItem} from '../interface/subjects';

@Injectable({
  providedIn: 'root'
})
export class Subjects {

  http = inject(HttpClient)

  subjectURL: string;

  constructor() {
    this.subjectURL = `http://localhost:3000/subjects`
  }

  getSubjects(): Observable<SubjectItem[]> {
    return this.http.get<SubjectItem[]>(`${this.subjectURL}`)
  }

}
