import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInRegister } from './log-in-register';

describe('LogInRegister', () => {
  let component: LogInRegister;
  let fixture: ComponentFixture<LogInRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
