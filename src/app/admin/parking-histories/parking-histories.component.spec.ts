import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingHistoriesComponent } from './parking-histories.component';

describe('ParkingHistoriesComponent', () => {
  let component: ParkingHistoriesComponent;
  let fixture: ComponentFixture<ParkingHistoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingHistoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
