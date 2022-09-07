import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxtAppComponent } from './nxt-app.component';

describe('NxtAppComponent', () => {
  let component: NxtAppComponent;
  let fixture: ComponentFixture<NxtAppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NxtAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NxtAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
