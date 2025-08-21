import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiManagerComponent } from './kpi-manager.component';

describe('KpiManagerComponent', () => {
  let component: KpiManagerComponent;
  let fixture: ComponentFixture<KpiManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KpiManagerComponent]
    });
    fixture = TestBed.createComponent(KpiManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
