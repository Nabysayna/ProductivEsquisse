import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TntComponent } from './tnt.component';

describe('TntComponent', () => {
  let component: TntComponent;
  let fixture: ComponentFixture<TntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
