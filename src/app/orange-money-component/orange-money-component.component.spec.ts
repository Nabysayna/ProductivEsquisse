import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangeMoneyComponentComponent } from './orange-money-component.component';

describe('OrangeMoneyComponentComponent', () => {
  let component: OrangeMoneyComponentComponent;
  let fixture: ComponentFixture<OrangeMoneyComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrangeMoneyComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrangeMoneyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
