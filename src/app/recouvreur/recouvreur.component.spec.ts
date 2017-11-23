import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecouvreurComponent } from './recouvreur.component';

describe('RecouvreurComponent', () => {
  let component: RecouvreurComponent;
  let fixture: ComponentFixture<RecouvreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecouvreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecouvreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
