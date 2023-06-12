import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickLocationComponent } from './pick-location.component';

describe('PickLocationComponent', () => {
  let component: PickLocationComponent;
  let fixture: ComponentFixture<PickLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
