import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinvoicesComponent } from './myinvoices.component';

describe('MyinovicesComponent', () => {
  let component: MyinvoicesComponent;
  let fixture: ComponentFixture<MyinvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyinvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyinvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
