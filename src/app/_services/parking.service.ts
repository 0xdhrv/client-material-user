/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpProviderService } from '../_services/http-provider.service';
import { Parking } from '../_models';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  private parkingSubject: BehaviorSubject<any>;
  public parking: Observable<Parking>;

  constructor(private router: Router, private http: HttpProviderService) {
    this.parkingSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('{}'))
    );
    this.parking = this.parkingSubject.asObservable();
  }

  book(parking: Parking) {
    return this.http.Post(`${environment.apiUrl}/parking`, parking);
  }

  checkin() {
    return this.http.Post(`${environment.apiUrl}/parking/checkin`);
  }

  checkout() {
    return this.http.Post(`${environment.apiUrl}/parking/checkout`);
  }
}
