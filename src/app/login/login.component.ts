/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hide = true;

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService
      .login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .pipe()
      .subscribe(
        (user) => {
          this._snackBar.open('✓ Logged In', '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.user = user;
          console.log(
            '🚀 ~ file: login.component.ts ~ line 64 ~ LoginComponent ~ onSubmit ~ this.user ',
            this.user
          );
          if (this.user.role == 'Admin') {
            this.router.navigate(['/admin']);
            // this.router.navigate(['']);
            console.log('Admin');
          }
          if (this.user.role == 'ParkingManager') {
            // this.router.navigate(['/parkingmanager']);
            console.log('PM');
          }
          if (this.user.role == 'AllocationManager') {
            console.log('AM');
          }
          if (this.user.role == 'User') {
            console.log('User');
          }
        },
        (error) => {
          console.log(error);
          this._snackBar.open(`✗ Error ${error}`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.onReset();
          console.log(error);
        },
        () => {
          console.log('Here it goes');
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
