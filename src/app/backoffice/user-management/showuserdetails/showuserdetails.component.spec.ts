import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowuserdetailsComponent } from './showuserdetails.component';

describe('ShowuserdetailsComponent', () => {
  let component: ShowuserdetailsComponent;
  let fixture: ComponentFixture<ShowuserdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowuserdetailsComponent]
    });
    fixture = TestBed.createComponent(ShowuserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
