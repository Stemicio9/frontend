import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPasswordUserDialogComponent } from './edit-password-user-dialog.component';

describe('EditPasswordUserDialogComponent', () => {
  let component: EditPasswordUserDialogComponent;
  let fixture: ComponentFixture<EditPasswordUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPasswordUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPasswordUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
