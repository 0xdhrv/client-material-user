import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

// Models
import { User } from 'src/app/_models/user';

// Services
import { UserService } from 'src/app/_services/user.service';

// Idle.js
import { Idle } from 'idlejs/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  idle: Idle;
  user: User;

  ngOnInit(): void {
    // Logging Out User if inactive for 30 Minutes
    this.idle = new Idle()
      .whenNotInteractive()
      .within(29)
      .do(() => this.userService.logout())
      .start();

    this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private userService: UserService
  ) {
    // getting static data of title from routes array
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: unknown) => {
        if (data) {
          // setting title from received data
          this.titleService.setTitle(data + ' | MechPark');
        }
      });
  }

  // To Fix : { 1. sessionStorage implementation (n). to find  }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(): void {
    console.log('User would be logged out');
    // Problem : page refresh logs out user
    // this.userService.logout();
  }
}
