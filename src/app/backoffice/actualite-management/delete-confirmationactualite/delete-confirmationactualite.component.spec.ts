import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationactualiteComponent } from './delete-confirmationactualite.component';

describe('DeleteConfirmationactualiteComponent', () => {
  let component: DeleteConfirmationactualiteComponent;
  let fixture: ComponentFixture<DeleteConfirmationactualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationactualiteComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationactualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
