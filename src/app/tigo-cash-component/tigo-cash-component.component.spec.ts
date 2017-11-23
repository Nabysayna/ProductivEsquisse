import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TigoCashComponentComponent } from './tigo-cash-component.component';

describe('TigoCashComponentComponent', () => {
  let component: TigoCashComponentComponent;
  let fixture: ComponentFixture<TigoCashComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TigoCashComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TigoCashComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
