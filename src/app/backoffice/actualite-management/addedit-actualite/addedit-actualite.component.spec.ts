import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditActualiteComponent } from './addedit-actualite.component';

describe('AddeditActualiteComponent', () => {
  let component: AddeditActualiteComponent;
  let fixture: ComponentFixture<AddeditActualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditActualiteComponent]
    });
    fixture = TestBed.createComponent(AddeditActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
