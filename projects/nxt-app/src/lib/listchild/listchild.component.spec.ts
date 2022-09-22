import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListchildComponent } from './listchild.component';

describe('ListchildComponent', () => {
  let component: ListchildComponent;
  let fixture: ComponentFixture<ListchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
