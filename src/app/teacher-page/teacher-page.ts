import { Component, inject, OnInit } from '@angular/core';
import { Teacher } from '../service/teacher';
import { Router } from '@angular/router';
import { teachers } from '../interface/teacher';
import { students } from '../interface/student';
import { Student } from '../service/student';
import { Mark } from '../interface/marks';
import { Marks } from '../service/marks';

@Component({
  selector: 'app-teacher-page',
  imports: [],
  templateUrl: './teacher-page.html',
  styleUrl: './teacher-page.scss'
})
export class TeacherPage implements OnInit {

  teacher!: teachers
  students: students[] = []
  marks: Mark[] = []
  filteredStudents: students[] = []
  isEditing = false

  marksMap: Map<string, Mark> = new Map()
  tempMarks: Map<string, number> = new Map()

  tService = inject(Teacher)
  router = inject(Router)
  studService = inject(Student)
  mService = inject(Marks)

  ngOnInit() {

    const loggedInTeacher = this.tService.getCurrentTeacher()

    if (!loggedInTeacher) {
      this.router.navigate(['/log-in'])
      return
    }

    this.teacher = loggedInTeacher

    this.studService.getStudentsBySubject(this.teacher.subjectId).subscribe(res => {
      this.students = res
      this.filteredStudents = res
    })

    this.mService.getMarksForTeacher(this.teacher.subjectId, this.teacher.id).subscribe(res => {
        this.marks = res
        res.forEach(mark => {
          this.marksMap.set(mark.studentId, mark)
        })
      })
  }


  getMarkValue(studentId: string): number {
    const mark = this.marksMap.get(studentId)
    return mark ? mark.value : 0
  }

  updateTempMark(studentId: string, value: number) {
    this.tempMarks.set(studentId, value)
  }

  saveAllMarks() {
    this.students.forEach(student => {
      const value = this.tempMarks.get(student.id)
      if (value === undefined) return
      this.saveMark(student, value)
    })
    this.tempMarks.clear()
  }

  saveMark(student: students, value: number) {
    if (value < 0 || value > 100) return
    const existingMark = this.marksMap.get(student.id)
    if (existingMark) {
      const updatedMark: Mark = {
        ...existingMark,
        value
      }
      this.mService.updateMark(updatedMark).subscribe((res: any) => {
        this.marksMap.set(student.id, updatedMark)
      })
    } else {

      const newMark: Mark = {
        id: crypto.randomUUID(),
        studentId: student.id,
        subjectId: this.teacher.subjectId,
        teacherId: this.teacher.id,
        value,
        date: new Date().toISOString()
      }

      this.mService.addMark(newMark).subscribe(res => {
        this.marksMap.set(student.id, res)
      })

    }
  }

  toggleEditMarks() {
    if (this.isEditing) {
      this.saveAllMarks()
    }
    this.isEditing = !this.isEditing
  }

}
