import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueiladmincoursierComponent } from './accueiladmincoursier.component';

describe('AccueiladmincoursierComponent', () => {
  let component: AccueiladmincoursierComponent;
  let fixture: ComponentFixture<AccueiladmincoursierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueiladmincoursierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueiladmincoursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
