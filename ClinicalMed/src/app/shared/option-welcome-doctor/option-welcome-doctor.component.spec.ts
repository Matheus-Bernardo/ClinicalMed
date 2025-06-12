import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionWelcomeDoctorComponent } from './option-welcome-doctor.component';

describe('OptionWelcomeDoctorComponent', () => {
  let component: OptionWelcomeDoctorComponent;
  let fixture: ComponentFixture<OptionWelcomeDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionWelcomeDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionWelcomeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
