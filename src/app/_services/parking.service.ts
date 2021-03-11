import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Models
import { Parking } from 'src/app/_models/parking';
import { ParkingHistory } from 'src/app/_models/parkingHistory';

// Services
import { HttpProviderService } from 'src/app/_services/http-provider.service';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  private parkingSubject: BehaviorSubject<Parking>;
  public parking: Observable<Parking>;

  constructor(private http: HttpProviderService) {
    this.parkingSubject = new BehaviorSubject<Parking>(
      JSON.parse(localStorage.getItem('{}'))
    );
    this.parking = this.parkingSubject.asObservable();
  }

  book(parking: Parking): Observable<Parking> {
    return this.http.Post<Parking>(
      `${environment.apiUrl}/parkings/book`,
      parking
    );
  }

  checkin(): Observable<Parking> {
    return this.http.Post<Parking>(`${environment.apiUrl}/parkings/checkin`);
  }

  checkout(): Observable<Parking> {
    return this.http.Post<Parking>(`${environment.apiUrl}/parkings/checkout`);
  }

  receipt(): Observable<ParkingHistory> {
    return this.http.OnlyGet<ParkingHistory>(
      `${environment.apiUrl}/parkings/receipt`
    );
  }

  getByUser(id: number): Observable<Parking> {
    return this.http.Get<Parking>(`${environment.apiUrl}/parkings/byuser`, id);
  }
}
