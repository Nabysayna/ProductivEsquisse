import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RyaComponentComponent } from './rya-component.component';

describe('RyaComponentComponent', () => {
  let component: RyaComponentComponent;
  let fixture: ComponentFixture<RyaComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RyaComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RyaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
