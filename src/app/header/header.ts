import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, timer, map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header  implements OnInit{

  currentDateTime!: Observable<Date>;

  ngOnInit(): void {
    this.currentDateTime = timer(0, 1000).pipe(
      map(() => new Date())
    );
  }
}
