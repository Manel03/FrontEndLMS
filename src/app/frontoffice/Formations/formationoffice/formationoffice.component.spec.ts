import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationofficeComponent } from './formationoffice.component';

describe('FormationofficeComponent', () => {
  let component: FormationofficeComponent;
  let fixture: ComponentFixture<FormationofficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationofficeComponent]
    });
    fixture = TestBed.createComponent(FormationofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
