import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateLockOrUnLockComponent } from './initiate-lock-or-un-lock.component';

describe('InitiateLockOrUnLockComponent', () => {
  let component: InitiateLockOrUnLockComponent;
  let fixture: ComponentFixture<InitiateLockOrUnLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateLockOrUnLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateLockOrUnLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
