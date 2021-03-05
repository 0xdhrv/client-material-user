/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MustMatch } from '../_helpers/must-match.validator';

import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any;
  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userService.userValue;
    console.log(this.user);
    this.editForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
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
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

    console.log(this.user.id);

    this.userService
      .getById(this.user.id)
      .pipe(first())
      .subscribe((x) => this.editForm.patchValue(x));
  }

  hide = true;

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    alert(JSON.stringify(this.editForm.value));

    this.userService
      .update(this.editForm.value, this.user.id)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open('✓ Edited', '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          // this.router.navigate(['/home']);
        },
        (error) => {
          this._snackBar.open(`✗ Error ${error.error.message}`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.onReset();
          console.log(error);
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }
}
