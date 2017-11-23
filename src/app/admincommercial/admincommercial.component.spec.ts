import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincommercialComponent } from './admincommercial.component';

describe('AdmincommercialComponent', () => {
  let component: AdmincommercialComponent;
  let fixture: ComponentFixture<AdmincommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
