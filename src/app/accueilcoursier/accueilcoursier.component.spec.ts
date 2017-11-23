import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilcoursierComponent } from './accueilcoursier.component';

describe('AccueilcoursierComponent', () => {
  let component: AccueilcoursierComponent;
  let fixture: ComponentFixture<AccueilcoursierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilcoursierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilcoursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
