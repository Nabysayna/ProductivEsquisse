import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincoursierComponent } from './admincoursier.component';

describe('AdmincoursierComponent', () => {
  let component: AdmincoursierComponent;
  let fixture: ComponentFixture<AdmincoursierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincoursierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincoursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
