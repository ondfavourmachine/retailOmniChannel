import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirtimetransactionsComponent } from './airtimetransactions.component';

describe('AirtimetransactionsComponent', () => {
  let component: AirtimetransactionsComponent;
  let fixture: ComponentFixture<AirtimetransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirtimetransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirtimetransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
