import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAdminMultiPdvComponent } from './accueil-admin-multi-pdv.component';

describe('AccueilAdminMultiPdvComponent', () => {
  let component: AccueilAdminMultiPdvComponent;
  let fixture: ComponentFixture<AccueilAdminMultiPdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilAdminMultiPdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilAdminMultiPdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
