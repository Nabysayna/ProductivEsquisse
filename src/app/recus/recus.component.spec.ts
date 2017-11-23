import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecusComponent } from './recus.component';

describe('RecusComponent', () => {
  let component: RecusComponent;
  let fixture: ComponentFixture<RecusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
