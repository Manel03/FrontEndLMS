import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueformationsComponent } from './historiqueformations.component';

describe('HistoriqueformationsComponent', () => {
  let component: HistoriqueformationsComponent;
  let fixture: ComponentFixture<HistoriqueformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueformationsComponent]
    });
    fixture = TestBed.createComponent(HistoriqueformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
