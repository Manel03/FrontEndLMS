import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionCollaborateursComponent } from './progression-collaborateurs.component';

describe('ProgressionCollaborateursComponent', () => {
  let component: ProgressionCollaborateursComponent;
  let fixture: ComponentFixture<ProgressionCollaborateursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressionCollaborateursComponent]
    });
    fixture = TestBed.createComponent(ProgressionCollaborateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
