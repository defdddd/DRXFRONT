import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInoviceDialogComponent } from './edit-inovice-dialog.component';

describe('EditInoviceDialogComponent', () => {
  let component: EditInoviceDialogComponent;
  let fixture: ComponentFixture<EditInoviceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInoviceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInoviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
