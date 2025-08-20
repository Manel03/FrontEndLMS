import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenufrontComponent } from './menufront.component';

describe('MenufrontComponent', () => {
  let component: MenufrontComponent;
  let fixture: ComponentFixture<MenufrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenufrontComponent]
    });
    fixture = TestBed.createComponent(MenufrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
