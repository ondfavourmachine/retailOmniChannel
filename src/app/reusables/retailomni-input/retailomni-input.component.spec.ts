import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailomniInputComponent } from './retailomni-input.component';

describe('RetailomniInputComponent', () => {
  let component: RetailomniInputComponent;
  let fixture: ComponentFixture<RetailomniInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailomniInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailomniInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
