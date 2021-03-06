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

import { GarageService } from '../_services/garage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-garage',
  templateUrl: './create-garage.component.html',
  styleUrls: ['./create-garage.component.css']
})
export class CreateGarageComponent implements OnInit {
  createGarageForm: FormGroup;
  submitted = false;
  hasCleaningServiceFlag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private garageService: GarageService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.hasCleaningServiceFlag);
    this.createGarageForm = this.formBuilder.group({
      // name: this.formBuilder.control();
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
      hasCleaningService: ['', Validators.required]
      // cleaningRate: ['']
    });

    // this.createGarageForm.controls['cleaningRate'].setValue('0');
    // this.createGarageForm.controls['cleaningRate'].clearValidators();
    // console.log(this.createGarageForm.controls['cleaningRate'].value);
  }

  get f() {
    return this.createGarageForm.controls;
  }

  updateCleaningRate() {
    this.hasCleaningServiceFlag = !this.hasCleaningServiceFlag;
    if (this.hasCleaningServiceFlag == true) {
      console.log('Value N');
      this.createGarageForm.addControl('cleaningRate', new FormControl());
      this.createGarageForm.controls['cleaningRate'].setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ]);
      // this.createGarageForm.controls['cleaningRate'].reset();
      // this.createGarageForm.controls['cleaningRate'].setValidators([
      //   Validators.required,
      //   Validators.pattern(/^[0-9]*$/)
      // ]);
    } else {
      this.createGarageForm.removeControl('cleaningRate');
      // this.createGarageForm.controls['cleaningRate'].setValue('0');
      // this.createGarageForm.controls['cleaningRate'].clearValidators();
      console.log(this.createGarageForm.controls['cleaningRate'].value);
    }
  }

  ucr(event: any) {
    this.hasCleaningServiceFlag = event.checked;
    console.log(event.checked);
    console.log('Old :', this.createGarageForm);
    if (event.checked) {
      this.createGarageForm.addControl('cleaningRate', new FormControl());
      console.log('Added :', this.createGarageForm);
    } else {
      this.createGarageForm.removeControl('cleaningRate');
      console.log('Removed :', this.createGarageForm);
    }
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.createGarageForm.errors);

    // console.log(this.createGarageForm.;

    if (this.createGarageForm.invalid) {
      console.log('here we go');
      // alert(JSON.stringify(this.createGarageForm.value));
      // console.log(JSON.stringify(this.createGarageForm.value));
      return;
    }

    alert(JSON.stringify(this.createGarageForm.value));
    console.log(JSON.stringify(this.createGarageForm.value));

    // this.garageService
    //   .create(this.createGarageForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this._snackBar.open(`✓ Garage Created`, '', {
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
    this.createGarageForm.reset();
  }
}
