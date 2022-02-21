import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockedProfilesPendingApprovalComponent } from './unlocked-profiles-pending-approval.component';

describe('UnlockedProfilesPendingApprovalComponent', () => {
  let component: UnlockedProfilesPendingApprovalComponent;
  let fixture: ComponentFixture<UnlockedProfilesPendingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockedProfilesPendingApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockedProfilesPendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
