import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExcelComponentComponent } from './upload-excel-component.component';

describe('UploadExcelComponentComponent', () => {
  let component: UploadExcelComponentComponent;
  let fixture: ComponentFixture<UploadExcelComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadExcelComponentComponent]
    });
    fixture = TestBed.createComponent(UploadExcelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
