import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionWelcomePatientComponent } from './option-welcome-patient.component';

describe('OptionWelcomePatientComponent', () => {
  let component: OptionWelcomePatientComponent;
  let fixture: ComponentFixture<OptionWelcomePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionWelcomePatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionWelcomePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
