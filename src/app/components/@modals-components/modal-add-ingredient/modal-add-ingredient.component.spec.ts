import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddIngredientComponent } from './modal-add-ingredient.component';

describe('ModalAddIngredientComponent', () => {
  let component: ModalAddIngredientComponent;
  let fixture: ComponentFixture<ModalAddIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddIngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
