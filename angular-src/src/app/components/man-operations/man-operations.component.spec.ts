import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManOperationsComponent } from './man-operations.component';

describe('ManOpeationsComponent', () => {
  let component: ManOperationsComponent;
  let fixture: ComponentFixture<ManOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});