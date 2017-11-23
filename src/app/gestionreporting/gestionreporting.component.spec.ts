import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionreportingComponent } from './gestionreporting.component';

describe('GestionreportingComponent', () => {
  let component: GestionreportingComponent;
  let fixture: ComponentFixture<GestionreportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionreportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionreportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
