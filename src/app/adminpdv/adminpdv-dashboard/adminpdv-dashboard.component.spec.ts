import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpdvDashboardComponent } from './adminpdv-dashboard.component';

describe('AdminpdvDashboardComponent', () => {
  let component: AdminpdvDashboardComponent;
  let fixture: ComponentFixture<AdminpdvDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpdvDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpdvDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
