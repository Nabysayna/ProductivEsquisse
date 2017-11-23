import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcashComponent } from './postcash.component';

describe('PostcashComponent', () => {
  let component: PostcashComponent;
  let fixture: ComponentFixture<PostcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
