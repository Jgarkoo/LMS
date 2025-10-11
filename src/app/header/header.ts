import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable, timer, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit,  OnDestroy {

  currentDateTime!: Observable<Date>;
  currentUrl = '';
  private router = inject(Router);
  sub = new Subscription();

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
}
