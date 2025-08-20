import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationmanagementComponent } from './formationmanagement.component';

describe('FormationmanagementComponent', () => {
  let component: FormationmanagementComponent;
  let fixture: ComponentFixture<FormationmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationmanagementComponent]
    });
    fixture = TestBed.createComponent(FormationmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
