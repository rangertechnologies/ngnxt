import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownWithFlagComponent } from './dropdown-with-flag.component';

describe('DropdownWithFlagComponent', () => {
  let component: DropdownWithFlagComponent;
  let fixture: ComponentFixture<DropdownWithFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownWithFlagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownWithFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
