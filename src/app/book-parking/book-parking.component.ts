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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  spaces: any[];
  selectedGarageId: string;
  selectedGarage = false;
  selectedSpaceId: string;
  selectedSpace = false;
  withCleaningServiceFlag: boolean;
  hasCleaningService: boolean;

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
      garageId: this.formBuilder.control('', [Validators.required]),
      spaceId: this.formBuilder.control('', [Validators.required]),
      vehicleNumber: this.formBuilder.control('', [Validators.required]),
      driverName: this.formBuilder.control('', [Validators.required]),
      withCleaningService: this.formBuilder.control('', [Validators.required])
    });

    this.bookParkingForm.controls['withCleaningService'].setValue(false);
  }

  selectGarage(
    id: string,
    garageOccupiedCapacity: string,
    garageTotalCapacity: string,
    hasCleaningService: boolean
  ) {
    if (this.selectedGarageId == id) {
      this.selectedGarage = !this.selectedGarage;
      this.bookParkingForm.controls['garageId'].reset();
      this.bookParkingForm.controls['spaceId'].reset();
    } else {
      this.selectedGarage = true;
      this.selectedGarageId = id;
      if (garageOccupiedCapacity != garageTotalCapacity) {
        this.selectedGarageId = id;
        this.spaceService
          .getByGarageId(this.selectedGarageId)
          .subscribe((data) => {
            this.spaces = data;
          });
        this.bookParkingForm.controls['garageId'].setValue(
          this.selectedGarageId
        );
        this.hasCleaningService = hasCleaningService;
      }
    }
  }

  selectSpace(
    id: string,
    spaceOccupiedCapacity: string,
    spaceTotalCapacity: string
  ) {
    if (this.selectedSpaceId == id) {
      this.selectedSpace = !this.selectedSpace;
      this.bookParkingForm.controls['spaceId'].reset();
    } else {
      this.selectedSpace = true;
      this.selectedSpaceId = id;
      if (spaceOccupiedCapacity != spaceTotalCapacity) {
        this.selectedSpaceId = id;
        this.bookParkingForm.controls['spaceId'].setValue(this.selectedSpaceId);
      }
    }
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
