import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoniJoniComponentComponent } from './joni-joni-component.component';

describe('JoniJoniComponentComponent', () => {
  let component: JoniJoniComponentComponent;
  let fixture: ComponentFixture<JoniJoniComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoniJoniComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoniJoniComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
