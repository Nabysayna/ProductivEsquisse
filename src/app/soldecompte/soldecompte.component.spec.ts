import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldecompteComponent } from './soldecompte.component';

describe('SoldecompteComponent', () => {
  let component: SoldecompteComponent;
  let fixture: ComponentFixture<SoldecompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldecompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldecompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
