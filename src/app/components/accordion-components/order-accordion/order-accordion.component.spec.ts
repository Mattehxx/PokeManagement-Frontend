import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAccordionComponent } from './order-accordion.component';

describe('OrderAccordionComponent', () => {
  let component: OrderAccordionComponent;
  let fixture: ComponentFixture<OrderAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
