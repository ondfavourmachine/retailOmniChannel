import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitupdatePendingApprovalComponent } from './limitupdate-pending-approval.component';

describe('LimitupdatePendingApprovalComponent', () => {
  let component: LimitupdatePendingApprovalComponent;
  let fixture: ComponentFixture<LimitupdatePendingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitupdatePendingApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitupdatePendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
