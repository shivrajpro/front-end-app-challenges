import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoodlesDetailComponent } from './noodles-detail.component';

describe('NoodlesDetailComponent', () => {
  let component: NoodlesDetailComponent;
  let fixture: ComponentFixture<NoodlesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoodlesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoodlesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
