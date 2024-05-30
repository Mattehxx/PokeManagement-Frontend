import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementAdminComponent } from './order-management-admin.component';

describe('OrderManagementAdminComponent', () => {
  let component: OrderManagementAdminComponent;
  let fixture: ComponentFixture<OrderManagementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderManagementAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderManagementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
