import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeformationComponent } from './homeformation.component';

describe('HomeformationComponent', () => {
  let component: HomeformationComponent;
  let fixture: ComponentFixture<HomeformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeformationComponent]
    });
    fixture = TestBed.createComponent(HomeformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
