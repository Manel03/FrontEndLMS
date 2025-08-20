import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowformationdetailComponent } from './showformationdetail.component';

describe('ShowformationdetailComponent', () => {
  let component: ShowformationdetailComponent;
  let fixture: ComponentFixture<ShowformationdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowformationdetailComponent]
    });
    fixture = TestBed.createComponent(ShowformationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
