import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursierComponent } from './coursier.component';

describe('CoursierComponent', () => {
  let component: CoursierComponent;
  let fixture: ComponentFixture<CoursierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
