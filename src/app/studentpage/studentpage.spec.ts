import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentpage } from './studentpage';

describe('Studentpage', () => {
  let component: Studentpage;
  let fixture: ComponentFixture<Studentpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studentpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
