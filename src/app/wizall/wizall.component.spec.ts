import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizallComponent } from './wizall.component';

describe('WizallComponent', () => {
  let component: WizallComponent;
  let fixture: ComponentFixture<WizallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
