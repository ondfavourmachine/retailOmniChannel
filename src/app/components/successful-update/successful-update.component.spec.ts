import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulUpdateComponent } from './successful-update.component';

describe('SuccessfulUpdateComponent', () => {
  let component: SuccessfulUpdateComponent;
  let fixture: ComponentFixture<SuccessfulUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
