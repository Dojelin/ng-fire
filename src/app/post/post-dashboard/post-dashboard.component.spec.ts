import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDashboardComponent } from './post-dashboard.component';

describe('PostDashboardComponent', () => {
  let component: PostDashboardComponent;
  let fixture: ComponentFixture<PostDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostDashboardComponent]
    });
    fixture = TestBed.createComponent(PostDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
