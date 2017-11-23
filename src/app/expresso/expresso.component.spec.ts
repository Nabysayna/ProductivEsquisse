import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressoComponent } from './expresso.component';

describe('ExpressoComponent', () => {
  let component: ExpressoComponent;
  let fixture: ComponentFixture<ExpressoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
