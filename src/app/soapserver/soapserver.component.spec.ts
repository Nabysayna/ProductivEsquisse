import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapserverComponent } from './soapserver.component';

describe('SoapserverComponent', () => {
  let component: SoapserverComponent;
  let fixture: ComponentFixture<SoapserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoapserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoapserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
