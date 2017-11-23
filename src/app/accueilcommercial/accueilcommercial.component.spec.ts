import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilcommercialComponent } from './accueilcommercial.component';

describe('AccueilcommercialComponent', () => {
  let component: AccueilcommercialComponent;
  let fixture: ComponentFixture<AccueilcommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilcommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilcommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
