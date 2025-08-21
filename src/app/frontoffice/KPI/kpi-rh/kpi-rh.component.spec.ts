import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiRhComponent } from './kpi-rh.component';

describe('KpiRhComponent', () => {
  let component: KpiRhComponent;
  let fixture: ComponentFixture<KpiRhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KpiRhComponent]
    });
    fixture = TestBed.createComponent(KpiRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
