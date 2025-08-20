import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDemandeComponent } from './historique-demande.component';

describe('HistoriqueDemandeComponent', () => {
  let component: HistoriqueDemandeComponent;
  let fixture: ComponentFixture<HistoriqueDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueDemandeComponent]
    });
    fixture = TestBed.createComponent(HistoriqueDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
