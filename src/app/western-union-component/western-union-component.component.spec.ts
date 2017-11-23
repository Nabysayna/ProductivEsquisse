import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WesternUnionComponentComponent } from './western-union-component.component';

describe('WesternUnionComponentComponent', () => {
  let component: WesternUnionComponentComponent;
  let fixture: ComponentFixture<WesternUnionComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WesternUnionComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WesternUnionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
