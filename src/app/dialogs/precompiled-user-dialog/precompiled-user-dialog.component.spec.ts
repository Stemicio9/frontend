import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecompiledUserDialogComponent } from './precompiled-user-dialog.component';

describe('PrecompiledUserDialogComponent', () => {
  let component: PrecompiledUserDialogComponent;
  let fixture: ComponentFixture<PrecompiledUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecompiledUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecompiledUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
