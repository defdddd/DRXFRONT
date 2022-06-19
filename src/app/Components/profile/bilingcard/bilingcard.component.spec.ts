import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilingcardComponent } from './bilingcard.component';

describe('BilingcardComponent', () => {
  let component: BilingcardComponent;
  let fixture: ComponentFixture<BilingcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilingcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilingcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
