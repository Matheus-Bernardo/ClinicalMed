import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultUserComponent } from './list-consult-user.component';

describe('ListConsultUserComponent', () => {
  let component: ListConsultUserComponent;
  let fixture: ComponentFixture<ListConsultUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsultUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsultUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
