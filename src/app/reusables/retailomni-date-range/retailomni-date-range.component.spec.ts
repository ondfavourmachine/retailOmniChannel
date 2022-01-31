import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailomniDateRangeComponent } from './retailomni-date-range.component';

describe('RetailomniDateRangeComponent', () => {
  let component: RetailomniDateRangeComponent;
  let fixture: ComponentFixture<RetailomniDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailomniDateRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailomniDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
