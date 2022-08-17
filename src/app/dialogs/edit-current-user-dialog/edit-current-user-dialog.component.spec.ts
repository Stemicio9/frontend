import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrentUserDialogComponent } from './edit-current-user-dialog.component';

describe('EditCurrentUserDialogComponent', () => {
  let component: EditCurrentUserDialogComponent;
  let fixture: ComponentFixture<EditCurrentUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCurrentUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCurrentUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
