import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAccordionComponent } from './product-accordion.component';

describe('ProductAccordionComponent', () => {
  let component: ProductAccordionComponent;
  let fixture: ComponentFixture<ProductAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
