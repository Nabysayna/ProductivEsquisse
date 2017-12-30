import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionnementComponent } from './commissionnement.component';

describe('CommissionnementComponent', () => {
  let component: CommissionnementComponent;
  let fixture: ComponentFixture<CommissionnementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionnementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
