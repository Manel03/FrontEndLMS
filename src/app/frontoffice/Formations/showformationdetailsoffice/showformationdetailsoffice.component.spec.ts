import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowformationdetailsofficeComponent } from './showformationdetailsoffice.component';

describe('ShowformationdetailsofficeComponent', () => {
  let component: ShowformationdetailsofficeComponent;
  let fixture: ComponentFixture<ShowformationdetailsofficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowformationdetailsofficeComponent]
    });
    fixture = TestBed.createComponent(ShowformationdetailsofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
