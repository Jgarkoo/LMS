import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentpage',
  imports: [],
  templateUrl: './studentpage.html',
  styleUrl: './studentpage.scss'
})
export class Studentpage {

  private router = inject(Router)

  logout() {
  localStorage.removeItem('isLoggedIn');
  this.router.navigate(['/']);
}
}
