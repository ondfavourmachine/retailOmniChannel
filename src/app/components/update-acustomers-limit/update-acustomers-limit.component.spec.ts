import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateACustomersLimitComponent } from './update-acustomers-limit.component';

describe('UpdateACustomersLimitComponent', () => {
  let component: UpdateACustomersLimitComponent;
  let fixture: ComponentFixture<UpdateACustomersLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateACustomersLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateACustomersLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
