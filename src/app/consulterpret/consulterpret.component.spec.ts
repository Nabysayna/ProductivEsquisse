import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterpretComponent } from './consulterpret.component';

describe('ConsulterpretComponent', () => {
  let component: ConsulterpretComponent;
  let fixture: ComponentFixture<ConsulterpretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterpretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterpretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
