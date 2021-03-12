import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: number;
  user: User;
  editUserForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.user = this.userService.userValue;
    console.log(this.user);
    this.editUserForm = this.formBuilder.group({
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
      ]
    });

    this.userService
      .getById(this.id)
      .pipe(first())
      .subscribe((x) => this.editUserForm.patchValue(x));
  }

  hide = true;

  get f() {
    return this.editUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editUserForm.invalid) {
      return;
    }

    alert(JSON.stringify(this.editUserForm.value));

    this.userService.update(this.editUserForm.value, this.id).subscribe(
      () => {
        this._snackBar.open('✓ Edited', '', {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/admin']);
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

  onReset(): void {
    this.submitted = false;
    this.editUserForm.reset();
  }
}
