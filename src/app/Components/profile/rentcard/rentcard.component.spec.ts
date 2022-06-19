import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentcardComponent } from './rentcard.component';

describe('RentcardComponent', () => {
  let component: RentcardComponent;
  let fixture: ComponentFixture<RentcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
