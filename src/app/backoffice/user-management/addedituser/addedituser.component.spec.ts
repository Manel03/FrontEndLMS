import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedituserComponent } from './addedituser.component';

describe('AddedituserComponent', () => {
  let component: AddedituserComponent;
  let fixture: ComponentFixture<AddedituserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddedituserComponent]
    });
    fixture = TestBed.createComponent(AddedituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
