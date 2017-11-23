import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpdvMonitoringComponent } from './adminpdv-monitoring.component';

describe('AdminpdvMonitoringComponent', () => {
  let component: AdminpdvMonitoringComponent;
  let fixture: ComponentFixture<AdminpdvMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpdvMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpdvMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
