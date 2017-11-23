import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueiladmincommercialComponent } from './accueiladmincommercial.component';

describe('AccueiladmincommercialComponent', () => {
  let component: AccueiladmincommercialComponent;
  let fixture: ComponentFixture<AccueiladmincommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueiladmincommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueiladmincommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
