import { Component, Input } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { product, productAdmin } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngredientAccordionComponent } from '../accordion-components/ingredient-accordion/ingredient-accordion.component';
import { ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-ingredient-management',
  standalone: true,
  templateUrl: './ingredient-management.component.html',
  styleUrl: './ingredient-management.component.scss',
  imports: [IngredientAccordionComponent, CommonModule, FormsModule]
})
export class IngredientManagementComponent {
  constructor(protected service: GenericService<ingredient>) {
    this.getProducts();
  }
  carboidrates: Array<ingredient> = [];
  proteins: Array<ingredient> = [];
  vegetables: Array<ingredient> = [];
  fruits: Array<ingredient> = [];
  sauces: Array<ingredient> = [];
  seeds: Array<ingredient> = [];
  spices: Array<ingredient> = [];
  generics: Array<ingredient> = [];






  getProducts() {
    this.service.getAll("Ingredient").subscribe({
      next: (data) => {
        console.log(data);
        this.carboidrates = data.filter(p=>p.ingredientTypeId == 2);
        this.vegetables = data.filter(p=>p.ingredientTypeId == 3);
        this.fruits = data.filter(p=>p.ingredientTypeId == 4);
        this.sauces = data.filter(p=>p.ingredientTypeId == 5);
        this.seeds = data.filter(p=>p.ingredientTypeId == 6);
        this.spices = data.filter(p=>p.ingredientTypeId == 7);
        this.generics = data.filter(p=>p.ingredientTypeId == 10);
      },error:(error) => {
        console.log(error);
      }
    })
  }
}
