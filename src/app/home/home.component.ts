/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
// import { HttpProviderService } from '../_services/http-provider.service';
import { HttpClient } from '@angular/common/http';
import { GarageService } from '../_services/garage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  parkingManager: any;
  garageId: any;
  garage: any;
  isGuest = true;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private garageService: GarageService
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
    if (this.user && this.user.role == 'ParkingManager') {
      this.userService
        .getParkingManager(this.user.id)
        .pipe(first())
        .subscribe((x) => {
          this.parkingManager = x;
          this.garageId = this.parkingManager.garageId;
          console.log(this.garageId);
          this.garageService
            .getById(this.garageId)
            .pipe()
            .subscribe((y) => {
              this.garage = y;
            });
        });

      // mergeMap((parkingManager) =>
      //   this.http.get(
      //     `http://localhost:4000/garages/${parkingManager.garageId}`
      //   )
      // );
      // .subscribe();
    }

    // if (this.user && this.user.role == 'ParkingManager') {
    //   this.userService.getParkingManager(this.user.id).subscribe((data) => {
    //     this.parkingManager = data;
    //     this.garageId = this.parkingManager.garageId;
    //     console.log(this.parkingManager);
    //     console.log(this.garageId);
    //   });
    //   console.log(this.parkingManager);
    //   console.log(this.garageId);
    //   this.garageService
    //     .getById(this.parkingManager.garageId)
    //     .subscribe((data) => {
    //       this.garage = data;
    //       // console.log(this.garage);
    //     });
    // }
  }
}
