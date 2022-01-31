import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTransactionsComponent } from './general-transactions.component';

describe('GeneralTransactionsComponent', () => {
  let component: GeneralTransactionsComponent;
  let fixture: ComponentFixture<GeneralTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
