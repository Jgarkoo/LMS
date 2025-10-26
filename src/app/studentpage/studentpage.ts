import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../service/student';
import { students } from '../interface/student';

@Component({
  selector: 'app-studentpage',
  imports: [],
  templateUrl: './studentpage.html',
  styleUrl: './studentpage.scss'
})
export class Studentpage  implements OnInit{

  id!: string
  student!: students
  isStudent: boolean = false;

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private service = inject(Student)

  constructor(){
    
  }
 
  ngOnInit(): void {
      const loggedInStudent = this.service.getCurrentStudent();
      if (loggedInStudent) {
        this.student = loggedInStudent;
      } else {
        this.router.navigate(['/log-in']);
      }
  }

  fetchStudent(){
    this.service.getSingleStudnet(this.id).subscribe({next: (res: students) =>{
      this.student = res; 
      const loggedInStudent = this.service.getCurrentStudent();
        if (loggedInStudent) {
          this.isStudent = loggedInStudent.id === this.student.id;
        }
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      
    }})
  }

}
