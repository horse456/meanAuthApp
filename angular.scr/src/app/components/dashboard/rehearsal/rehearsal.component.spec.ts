import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalComponent } from './rehearsal.component';

describe('RehearsalComponent', () => {
  let component: RehearsalComponent;
  let fixture: ComponentFixture<RehearsalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehearsalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
