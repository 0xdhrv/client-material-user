/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Garage } from '../_models/garage';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpProviderService } from '../_services/http-provider.service';

@Injectable({ providedIn: 'root' })
export class GarageService {
  private garageSubject: BehaviorSubject<any>;
  public garage: Observable<Garage>;

  constructor(private router: Router, private http: HttpProviderService) {
    this.garageSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('{}'))
    );
    this.garage = this.garageSubject.asObservable();
  }

  getById(id: string) {
    return this.http.Get(`${environment.apiUrl}/garages`, id);
  }

  create(garage: Garage) {
    return this.http.Post(`${environment.apiUrl}/garages/create`, garage);
  }

  update(garage: Garage, id: string) {
    return this.http.Update(`${environment.apiUrl}/garages/${id}`, garage);
  }

  delete(id: string) {
    return this.http.Delete(`${environment.apiUrl}/garages`, id);
  }
}
