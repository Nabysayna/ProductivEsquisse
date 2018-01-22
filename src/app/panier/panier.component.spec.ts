import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { panierComponent } from './panier.component';

describe('panierComponent', () => {
  let component: panierComponent;
  let fixture: ComponentFixture<panierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ panierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(panierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
