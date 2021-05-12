import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesStartComponent } from './notes-start.component';

describe('NotesStartComponent', () => {
  let component: NotesStartComponent;
  let fixture: ComponentFixture<NotesStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
