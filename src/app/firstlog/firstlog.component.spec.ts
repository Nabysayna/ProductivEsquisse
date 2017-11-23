import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstlogComponent } from './firstlog.component';

describe('FirstlogComponent', () => {
  let component: FirstlogComponent;
  let fixture: ComponentFixture<FirstlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
