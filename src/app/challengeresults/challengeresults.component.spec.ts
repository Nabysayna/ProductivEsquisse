import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeresultsComponent } from './challengeresults.component';

describe('ChallengeresultsComponent', () => {
  let component: ChallengeresultsComponent;
  let fixture: ComponentFixture<ChallengeresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
