import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiptransactionsComponent } from './niptransactions.component';

describe('NiptransactionsComponent', () => {
  let component: NiptransactionsComponent;
  let fixture: ComponentFixture<NiptransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiptransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiptransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
