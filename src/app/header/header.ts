import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable, timer, map, filter, Subscription } from 'rxjs';
import { Student } from '../service/student';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit,  OnDestroy {

  currentDateTime!: Observable<Date>;
  currentUrl = '';
  sub = new Subscription();
  private router = inject(Router);
  private service = inject(Student);

  ngOnInit(): void {
    this.currentDateTime = timer(0, 1000).pipe(map(() => new Date()));

    const routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.currentUrl = e.urlAfterRedirects);

    this.sub.add(routerSub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

  get isLoginPage(): boolean {
    return this.currentUrl.includes('/logIn');
  }

  get homePage(): boolean {
    return this.currentUrl.includes('/home');
  }

  get errorPage(): boolean {
    return this.currentUrl.includes('/404');
  }

  get logInRegister(): boolean {
    return this.currentUrl.includes('/login-register');
  }

  get studentPage(): boolean {
    return this.currentUrl.includes('/student-page');
  }

  get teacherLogIn(): boolean {
  return this.currentUrl.includes('/teacher-LogIn');
  }

  get teacherPage(): boolean {
    return this.currentUrl.includes('/teacher-page');
  }
}
