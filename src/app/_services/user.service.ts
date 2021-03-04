/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpProviderService } from '../_services/http-provider.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpProviderService) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  register(user: User) {
    return this.http.Post(`${environment.apiUrl}/users/register`, user);
  }

  login(email: string, password: string) {
    return this.http
      .Post(`${environment.apiUrl}/users/authenticate`, {
        email,
        password
      })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  update(id: number) {
    return this.http.Update(`${environment.apiUrl}/users/`, id);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    // this.router.navigate(['/home']);
  }
}
