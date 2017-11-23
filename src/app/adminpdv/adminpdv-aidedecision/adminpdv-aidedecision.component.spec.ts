import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpdvAidedecisionComponent } from './adminpdv-aidedecision.component';

describe('AdminpdvAidedecisionComponent', () => {
  let component: AdminpdvAidedecisionComponent;
  let fixture: ComponentFixture<AdminpdvAidedecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpdvAidedecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpdvAidedecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
