import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditFormationComponent } from './addedit-formation.component';

describe('AddeditFormationComponent', () => {
  let component: AddeditFormationComponent;
  let fixture: ComponentFixture<AddeditFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditFormationComponent]
    });
    fixture = TestBed.createComponent(AddeditFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
