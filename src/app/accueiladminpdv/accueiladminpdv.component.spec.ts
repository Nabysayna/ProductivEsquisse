import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueiladminpdvComponent } from './accueiladminpdv.component';

describe('AccueiladminpdvComponent', () => {
  let component: AccueiladminpdvComponent;
  let fixture: ComponentFixture<AccueiladminpdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueiladminpdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueiladminpdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
