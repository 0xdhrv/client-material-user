/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { ParkingService } from '../_services/parking.service';
import { GarageService } from '../_services/garage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent implements OnInit {
  bookParkingForm: FormGroup;
  submitted = false;
  user: any;
  garages: any[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private garageService: GarageService,
    private parkingService: ParkingService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.user = user;
    });

    this.garageService.getAll().subscribe((data) => {
      this.garages = data;
      console.log(data);
    });

    this.bookParkingForm = this.formBuilder.group({
      // garageId: this.formBuilder.control('', [Validators.required]),
      // spaceId: this.formBuilder.control('', [Validators.required]),
      vehicleNumber: this.formBuilder.control('', [Validators.required]),
      driverName: this.formBuilder.control('', [Validators.required]),
      withCleaningService: this.formBuilder.control('')
    });
  }

  get f() {
    return this.bookParkingForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    alert(JSON.stringify(this.bookParkingForm.value));
    console.log(JSON.stringify(this.bookParkingForm.value));
  }
}
