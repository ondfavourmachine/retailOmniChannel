import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NqrtransactionsComponent } from './nqrtransactions.component';

describe('NqrtransactionsComponent', () => {
  let component: NqrtransactionsComponent;
  let fixture: ComponentFixture<NqrtransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NqrtransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NqrtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
