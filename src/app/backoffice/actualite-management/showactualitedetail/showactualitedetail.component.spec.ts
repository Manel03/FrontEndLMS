import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowactualitedetailComponent } from './showactualitedetail.component';

describe('ShowactualitedetailComponent', () => {
  let component: ShowactualitedetailComponent;
  let fixture: ComponentFixture<ShowactualitedetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowactualitedetailComponent]
    });
    fixture = TestBed.createComponent(ShowactualitedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
