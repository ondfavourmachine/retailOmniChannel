import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillstransactionsComponent } from './billstransactions.component';

describe('BillstransactionsComponent', () => {
  let component: BillstransactionsComponent;
  let fixture: ComponentFixture<BillstransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillstransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillstransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
