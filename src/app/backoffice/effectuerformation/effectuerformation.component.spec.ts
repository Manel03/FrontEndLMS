import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectuerformationComponent } from './effectuerformation.component';

describe('EffectuerformationComponent', () => {
  let component: EffectuerformationComponent;
  let fixture: ComponentFixture<EffectuerformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EffectuerformationComponent]
    });
    fixture = TestBed.createComponent(EffectuerformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
