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
import { ClickOutsideModule } from 'ng-click-outside';

import { Router } from '@angular/router';
import {
  UserService,
  GarageService,
  SpaceService,
  ParkingService
} from '../_services';

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
  otherSpaces: any[];
  selectedGarageId: string;
  selectedGarage = false;
  garageBlurred = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
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
    });

    this.bookParkingForm = this.formBuilder.group({
      // garageId: this.formBuilder.control('', [Validators.required]),
      // spaceId: this.formBuilder.control('', [Validators.required]),
      vehicleNumber: this.formBuilder.control('', [Validators.required]),
      driverName: this.formBuilder.control('', [Validators.required]),
      withCleaningService: this.formBuilder.control('')
    });
  }

  selectGarage(
    id: string,
    garageOccupiedCapacity: string,
    garageTotalCapacity: string
  ) {
    if (garageOccupiedCapacity != garageTotalCapacity) {
      console.log(id);
      this.selectedGarageId = id;
      this.selectedGarage = true;
    }
    this.spaceService.getByGarageId(this.selectedGarageId).subscribe((data) => {
      this.otherSpaces = data;
    });
  }

  unselectGarage() {
    this.selectedGarage = false;
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
