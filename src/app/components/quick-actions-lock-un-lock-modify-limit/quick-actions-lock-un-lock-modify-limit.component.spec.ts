import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickActionsLockUnLockModifyLimitComponent } from './quick-actions-lock-un-lock-modify-limit.component';

describe('QuickActionsLockUnLockModifyLimitComponent', () => {
  let component: QuickActionsLockUnLockModifyLimitComponent;
  let fixture: ComponentFixture<QuickActionsLockUnLockModifyLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickActionsLockUnLockModifyLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickActionsLockUnLockModifyLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
