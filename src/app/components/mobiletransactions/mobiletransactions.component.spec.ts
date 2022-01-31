import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobiletransactionsComponent } from './mobiletransactions.component';

describe('MobiletransactionsComponent', () => {
  let component: MobiletransactionsComponent;
  let fixture: ComponentFixture<MobiletransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobiletransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobiletransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
