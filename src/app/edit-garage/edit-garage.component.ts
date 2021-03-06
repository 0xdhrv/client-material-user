/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GarageService } from '../_services/garage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-edit-garage',
  templateUrl: './edit-garage.component.html',
  styleUrls: ['./edit-garage.component.css']
})
export class EditGarageComponent implements OnInit {
  garage: any;
  user: any;
  parkingManager: any;
  garageId: any;
  editGarageForm: FormGroup;
  submitted = false;
  hasCleaningServiceFlag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private garageService: GarageService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hasCleaningServiceFlag = false;
    this.editGarageForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      parkingRate: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      hasCleaningService: ['', Validators.required],
      cleaningRate: ['']
    });

    this.userService.user.subscribe((user) => {
      this.user = user;
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
            .getById(this.garageId.toString())
            .pipe()
            .subscribe((y) => {
              this.editGarageForm.patchValue(y);
            });
        });
    }

    // this.garageService
    //   .getById(this.parkingManager.garageId)
    //   .pipe(first())
    //   .subscribe((x) => this.editGarageForm.patchValue(x));

    // this.userService
    //   .getById(this.user.id)
    //   .pipe(first())
    //   .subscribe((x) => this.editUserForm.patchValue(x));
  }

  get f() {
    return this.editGarageForm.controls;
  }

  updateCleaningRate() {
    if (this.hasCleaningServiceFlag == false) {
      this.hasCleaningServiceFlag = true;
      this.editGarageForm.controls['cleaningRate'].reset();
      this.editGarageForm.controls['cleaningRate'].setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ]);
    } else {
      this.hasCleaningServiceFlag = false;
      this.editGarageForm.controls['cleaningRate'].setValue('0');
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.editGarageForm.invalid) {
      return;
    }

    alert(JSON.stringify(this.editGarageForm.value));
    console.log(JSON.stringify(this.editGarageForm.value));

    // this.garageService
    //   .update(this.editGarageForm.value, this.garageId)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this._snackBar.open(`✓ Garage Edited`, '', {
    //         duration: 1500,
    //         horizontalPosition: 'right',
    //         verticalPosition: 'bottom'
    //       });
    //     },
    //     (error) => {
    //       this._snackBar.open(`✗ Error ${error.error.message}`, '', {
    //         duration: 1500,
    //         horizontalPosition: 'right',
    //         verticalPosition: 'bottom'
    //       });
    //       this.onReset();
    //       console.log(error);
    //     }
    //   );
  }

  onReset() {
    this.submitted = false;
    this.editGarageForm.reset();
  }
}
