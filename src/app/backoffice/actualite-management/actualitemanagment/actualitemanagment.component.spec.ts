import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualitemanagmentComponent } from './actualitemanagment.component';

describe('ActualitemanagmentComponent', () => {
  let component: ActualitemanagmentComponent;
  let fixture: ComponentFixture<ActualitemanagmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualitemanagmentComponent]
    });
    fixture = TestBed.createComponent(ActualitemanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
