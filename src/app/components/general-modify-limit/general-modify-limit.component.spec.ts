import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralModifyLimitComponent } from './general-modify-limit.component';

describe('GeneralModifyLimitComponent', () => {
  let component: GeneralModifyLimitComponent;
  let fixture: ComponentFixture<GeneralModifyLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralModifyLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralModifyLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
