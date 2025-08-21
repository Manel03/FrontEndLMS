import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCollaborateurComponent } from './kpi-collaborateur.component';
import { beforeEach, describe, it } from 'node:test';

describe('KpiCollaborateurComponent', () => {
  let component: KpiCollaborateurComponent;
  let fixture: ComponentFixture<KpiCollaborateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KpiCollaborateurComponent]
    }).compileComponents(); 

    fixture = TestBed.createComponent(KpiCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
