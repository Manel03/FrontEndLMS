import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowactualitedetailofficeComponent } from './showactualitedetailoffice.component';

describe('ShowactualitedetailofficeComponent', () => {
  let component: ShowactualitedetailofficeComponent;
  let fixture: ComponentFixture<ShowactualitedetailofficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowactualitedetailofficeComponent]
    });
    fixture = TestBed.createComponent(ShowactualitedetailofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
