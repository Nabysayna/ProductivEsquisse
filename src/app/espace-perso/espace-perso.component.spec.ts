import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacePersoComponent } from './espace-perso.component';

describe('EspacePersoComponent', () => {
  let component: EspacePersoComponent;
  let fixture: ComponentFixture<EspacePersoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacePersoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacePersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
