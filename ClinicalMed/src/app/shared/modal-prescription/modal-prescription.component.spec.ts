import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrescriptionComponent } from './modal-prescription.component';

describe('ModalPrescriptionComponent', () => {
  let component: ModalPrescriptionComponent;
  let fixture: ComponentFixture<ModalPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPrescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
