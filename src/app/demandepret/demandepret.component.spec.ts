import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandepretComponent } from './demandepret.component';

describe('DemandepretComponent', () => {
  let component: DemandepretComponent;
  let fixture: ComponentFixture<DemandepretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandepretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandepretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
