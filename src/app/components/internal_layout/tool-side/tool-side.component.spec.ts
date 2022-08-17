import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSideComponent } from './tool-side.component';

describe('ToolSideComponent', () => {
  let component: ToolSideComponent;
  let fixture: ComponentFixture<ToolSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
