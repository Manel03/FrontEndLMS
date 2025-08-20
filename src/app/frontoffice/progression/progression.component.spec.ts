import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionComponent } from './progression.component';

describe('ProgressionComponent', () => {
  let component: ProgressionComponent;
  let fixture: ComponentFixture<ProgressionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressionComponent]
    });
    fixture = TestBed.createComponent(ProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
