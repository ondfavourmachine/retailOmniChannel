import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdtransactionsComponent } from './ussdtransactions.component';

describe('UssdtransactionsComponent', () => {
  let component: UssdtransactionsComponent;
  let fixture: ComponentFixture<UssdtransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UssdtransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
