/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, ParkingManager, AllocationManager } from '../_models';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpProviderService } from '../_services/http-provider.service';
import { LocalService } from './local.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;
  private parkingManagerSubject: BehaviorSubject<any>;
  public parkingManager: Observable<ParkingManager>;
  private allocationManagerSubject: BehaviorSubject<any>;
  public allocationManager: Observable<AllocationManager>;

  constructor(
    private router: Router,
    private http: HttpProviderService,
    private localService: LocalService
  ) {
    this.userSubject = new BehaviorSubject<any>(
      // JSON.parse(localStorage.getItem('user') || '{}')
      JSON.parse(this.localService.getJsonValue('user'))
    );
    this.user = this.userSubject.asObservable();
    // this.parkingManagerSubject = new BehaviorSubject<any>(JSON.parse('{}'));
    // this.parkingManager = this.parkingManagerSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // public get parkingManagerValue(): ParkingManager {
  //   return this.parkingManagerSubject.value;
  // }

  getById(id: string) {
    return this.http.Get(`${environment.apiUrl}/users`, id);
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
          this.localService.setJsonValue('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  update(user: User, id: string) {
    return this.http.Update(`${environment.apiUrl}/users/${id}`, user);
  }

  delete(id: string) {
    return this.http.Delete(`${environment.apiUrl}/users`, id);
  }

  logout() {
    // localStorage.removeItem('user');
    this.localService.clear();
    this.userSubject.next(null);
  }

  getParkingManager(id: string) {
    return this.http.Get(`${environment.apiUrl}/users/parkingmanagers`, id);
  }

  getAllocationManager(id: string) {
    return this.http.Get(`${environment.apiUrl}/users/allocationmanagers`, id);
  }
}
