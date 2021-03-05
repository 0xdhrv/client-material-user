import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGarageComponent } from './edit-garage.component';

describe('EditGarageComponent', () => {
  let component: EditGarageComponent;
  let fixture: ComponentFixture<EditGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGarageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
