import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinovicesComponent } from './myinovices.component';

describe('MyinovicesComponent', () => {
  let component: MyinovicesComponent;
  let fixture: ComponentFixture<MyinovicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyinovicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyinovicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
