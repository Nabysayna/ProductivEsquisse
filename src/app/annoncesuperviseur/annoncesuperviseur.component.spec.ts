import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesuperviseurComponent } from './annoncesuperviseur.component';

describe('AnnoncesuperviseurComponent', () => {
  let component: AnnoncesuperviseurComponent;
  let fixture: ComponentFixture<AnnoncesuperviseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncesuperviseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncesuperviseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
