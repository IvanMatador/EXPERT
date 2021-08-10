import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocxRedactorComponent } from './docx-redactor.component';

describe('DocxRedactorComponent', () => {
  let component: DocxRedactorComponent;
  let fixture: ComponentFixture<DocxRedactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocxRedactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocxRedactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
