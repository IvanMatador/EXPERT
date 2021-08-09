import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCashPageComponent } from './add-cash-page.component';

describe('AddCashPageComponent', () => {
  let component: AddCashPageComponent;
  let fixture: ComponentFixture<AddCashPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCashPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCashPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
