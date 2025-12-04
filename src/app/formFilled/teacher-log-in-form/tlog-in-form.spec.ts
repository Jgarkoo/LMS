import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlogInForm } from './tlog-in-form';

describe('TlogInForm', () => {
  let component: TlogInForm;
  let fixture: ComponentFixture<TlogInForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TlogInForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TlogInForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
