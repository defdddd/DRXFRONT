import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiclesDialogComponent } from './edit-vehicles-dialog.component';

describe('EditVehiclesDialogComponent', () => {
  let component: EditVehiclesDialogComponent;
  let fixture: ComponentFixture<EditVehiclesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehiclesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehiclesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
