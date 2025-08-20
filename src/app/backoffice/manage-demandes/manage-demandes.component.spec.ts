import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDemandesComponent } from './manage-demandes.component';

describe('ManageDemandesComponent', () => {
  let component: ManageDemandesComponent;
  let fixture: ComponentFixture<ManageDemandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDemandesComponent]
    });
    fixture = TestBed.createComponent(ManageDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
