import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBar1Component } from './header-bar1.component';

describe('HeaderBar1Component', () => {
  let component: HeaderBar1Component;
  let fixture: ComponentFixture<HeaderBar1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBar1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
