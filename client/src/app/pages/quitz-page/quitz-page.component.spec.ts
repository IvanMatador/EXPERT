import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitzPageComponent } from './quitz-page.component';

describe('QuitzPageComponent', () => {
  let component: QuitzPageComponent;
  let fixture: ComponentFixture<QuitzPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitzPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitzPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
