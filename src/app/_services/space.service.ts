/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Space } from '../_models';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpProviderService } from '../_services/http-provider.service';

@Injectable({ providedIn: 'root' })
export class SpaceService {
  private spaceSubject: BehaviorSubject<any>;
  public space: Observable<Space>;

  constructor(private router: Router, private http: HttpProviderService) {
    this.spaceSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('{}'))
    );
    this.space = this.spaceSubject.asObservable();
  }

  getById(id: string) {
    return this.http.Get(`${environment.apiUrl}/spaces`, id);
  }

  create(space: Space) {
    return this.http.Post(`${environment.apiUrl}/spaces/create`, space);
  }

  update(space: Space, id: string) {
    return this.http.Update(`${environment.apiUrl}/spaces/${id}`, space);
  }

  delete(id: string) {
    return this.http.Delete(`${environment.apiUrl}/spaces`, id);
  }
}
