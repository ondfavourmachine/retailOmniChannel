import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySearchResultsComponent } from './display-search-results.component';

describe('DisplaySearchResultsComponent', () => {
  let component: DisplaySearchResultsComponent;
  let fixture: ComponentFixture<DisplaySearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
