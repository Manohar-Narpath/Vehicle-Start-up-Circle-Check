import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInspectionDialogComponent } from './add-inspection-dialog.component';

describe('AddInspectionDialogComponent', () => {
  let component: AddInspectionDialogComponent;
  let fixture: ComponentFixture<AddInspectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInspectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInspectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
