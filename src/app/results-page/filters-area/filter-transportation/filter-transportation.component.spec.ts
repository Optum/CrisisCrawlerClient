import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTransportationComponent } from './filter-transportation.component';

describe('FilterTransportationComponent', () => {
  let component: FilterTransportationComponent;
  let fixture: ComponentFixture<FilterTransportationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
