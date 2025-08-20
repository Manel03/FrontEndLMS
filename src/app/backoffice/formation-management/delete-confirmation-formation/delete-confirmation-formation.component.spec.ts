import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationFormationComponent } from './delete-confirmation-formation.component';

describe('DeleteConfirmationFormationComponent', () => {
  let component: DeleteConfirmationFormationComponent;
  let fixture: ComponentFixture<DeleteConfirmationFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationFormationComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
