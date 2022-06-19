import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InovicesComponent } from './inovices.component';

describe('InovicesComponent', () => {
  let component: InovicesComponent;
  let fixture: ComponentFixture<InovicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InovicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InovicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
