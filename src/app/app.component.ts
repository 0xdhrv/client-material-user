/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { UserService } from './_services/user.service';
import { Idle } from 'idlejs/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  idle: Idle;
  ngOnInit() {
    console.log('START');
    this.idle = new Idle()
      .whenNotInteractive()
      .within(29)
      .do(() => this.userService.logout())
      .start();
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private userService: UserService
  ) {
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
          this.titleService.setTitle(data + ' | MechPark');
        }
      });
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    this.userService.logout();
  }
}
