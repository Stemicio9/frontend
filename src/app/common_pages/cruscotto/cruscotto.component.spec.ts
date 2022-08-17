import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruscottoComponent } from './cruscotto.component';

describe('CruscottoComponent', () => {
  let component: CruscottoComponent;
  let fixture: ComponentFixture<CruscottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruscottoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruscottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
