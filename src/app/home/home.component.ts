/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
// import { HttpProviderService } from '../_services/http-provider.service';
import { Space } from '../_models';
import { HttpClient } from '@angular/common/http';
import { GarageService } from '../_services/garage.service';
import { UserService } from '../_services/user.service';
import { SpaceService } from '../_services/space.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  userInfo: any;
  parkingManager: any;
  garageId: any;
  garage: any;
  allocationManager: any;
  spaceId: any;
  space: any;
  spaces: any[];
  otherSpaces: any[];
  isGuest = true;
  displayedColumns: string[] = [
    'code',
    'totalCapacity',
    'occupiedCapacity',
    'action'
  ];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
    private router: Router
  ) {
    this.isGuest = true;
  }

  delete(): void {
    this.userService.delete(this.user.id).pipe(first()).subscribe();
    this.userService.logout();
    this.isGuest = true;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
    this.isGuest = true;
  }

  deleteGarage(): void {
    this.garageService
      .delete(this.garage.id)
      .pipe(first())
      .subscribe(() => {
        if (this.user && this.user.role == 'ParkingManager') {
          this.userService
            .getParkingManager(this.user.id)
            .pipe(first())
            .subscribe((x) => {
              this.parkingManager = x;
              this.garageId = this.parkingManager.garageId;
              this.garageService
                .getById(this.garageId)
                .pipe()
                .subscribe((y) => {
                  this.garage = y;
                });
            });
        }
      });
  }

  deleteSpace(id: string): void {
    console.log(id);
    this.spaceService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        if (this.user && this.user.role == 'AllocationManager') {
          this.userService
            .getAllocationManager(this.user.id)
            .pipe(first())
            .subscribe((x) => {
              this.allocationManager = x;
              this.spaceService.getAll().subscribe((data) => {
                this.otherSpaces = data;
                this.otherSpaces = this.otherSpaces.filter((x) => {
                  return x.allocationManagerId === this.allocationManager.id;
                });
                const spaces: Space[] = this.otherSpaces;
              });
            });
        }
      });
  }

  ngOnInit(): void {
    this.isGuest = true;
    this.userService.user.subscribe((user) => {
      this.user = user;
      console.log(user);
      if (user == null) {
      } else {
        this.userInfo = this.userService
          .getById(this.user.id)
          .pipe(first())
          .subscribe((userInfo) => {
            this.userInfo = userInfo;
            console.log(this.userInfo);
          });
        if (user && user.role) {
          this.isGuest = false;
        } else {
          this.isGuest = true;
        }
      }
    });
    if (this.user && this.user.role == 'ParkingManager') {
      this.userService
        .getParkingManager(this.user.id)
        .pipe(first())
        .subscribe((x) => {
          this.parkingManager = x;
          this.garageId = this.parkingManager.garageId;
          this.garageService
            .getById(this.garageId)
            .pipe()
            .subscribe((y) => {
              this.garage = y;
            });
        });
    }

    if (this.user && this.user.role == 'AllocationManager') {
      this.userService
        .getAllocationManager(this.user.id)
        .pipe(first())
        .subscribe((x) => {
          this.allocationManager = x;
          this.spaceService.getAll().subscribe((data) => {
            this.otherSpaces = data;
            this.otherSpaces = this.otherSpaces.filter((x) => {
              return x.allocationManagerId === this.allocationManager.id;
            });
            const spaces: Space[] = this.otherSpaces;
          });
        });
    }
  }
}
