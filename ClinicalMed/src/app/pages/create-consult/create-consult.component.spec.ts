import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsultComponent } from './create-consult.component';

describe('CreateConsultComponent', () => {
  let component: CreateConsultComponent;
  let fixture: ComponentFixture<CreateConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConsultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
