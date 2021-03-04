import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  isGuest = true;

  constructor(private userService: UserService, private router: Router) {
    this.isGuest = true;
  }

  logout(): void {
    this.userService.logout();
    // this.router.navigate(['/home']);
    this.isGuest = true;
  }

  ngOnInit(): void {
    this.isGuest = true;
    this.userService.user.subscribe((user) => {
      this.user = user;
      if (user && user.role) {
        this.isGuest = false;
      } else {
        this.isGuest = true;
      }
    });
  }
}
