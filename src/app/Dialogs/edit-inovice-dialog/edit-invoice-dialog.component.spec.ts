import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceDialogComponent } from './edit-invoice-dialog.component';

describe('EditInoviceDialogComponent', () => {
  let component: EditInvoiceDialogComponent;
  let fixture: ComponentFixture<EditInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInvoiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
