import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibtransactionsComponent } from './ribtransactions.component';

describe('RibtransactionsComponent', () => {
  let component: RibtransactionsComponent;
  let fixture: ComponentFixture<RibtransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RibtransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RibtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
