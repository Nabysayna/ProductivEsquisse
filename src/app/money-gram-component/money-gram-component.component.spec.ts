import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyGramComponentComponent } from './money-gram-component.component';

describe('MoneyGramComponentComponent', () => {
  let component: MoneyGramComponentComponent;
  let fixture: ComponentFixture<MoneyGramComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyGramComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyGramComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
