import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifDialogComponent } from './motif-dialog.component';

describe('MotifDialogComponent', () => {
  let component: MotifDialogComponent;
  let fixture: ComponentFixture<MotifDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotifDialogComponent]
    });
    fixture = TestBed.createComponent(MotifDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
