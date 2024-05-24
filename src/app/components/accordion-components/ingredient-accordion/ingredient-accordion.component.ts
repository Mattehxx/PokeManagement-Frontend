import { Component, Input, Output } from '@angular/core';
import { ingredient } from '../../../models/ingredient.model';
import { element } from '../../../models/element.model';

@Component({
  selector: 'app-ingredient-accordion',
  standalone: true,
  imports: [],
  templateUrl: './ingredient-accordion.component.html',
  styleUrl: './ingredient-accordion.component.scss'
})
export class IngredientAccordionComponent {
  @Input()
  ingredient: Array<ingredient> = []
  @Output()
  ingredientType: element;
  //productIngredients: Array<productIngredient> = []
  toEdit: ingredient;


  constructor() {
    this.ingredientType = {
      id: 0,
      description: ""
    };
    this.toEdit = {
      id: 0,
      name: "",
      description: "",
      calories: 0,
      isDeleted: false,
      additionalCost: 0,
      allergen: false,
      ingredientTypeId: 0,
      ingredientType: this.ingredientType
    };
  }


  getToEditProduct(ing: ingredient) {  //prende in input ingrediente da modificare  
    this.toEdit = ing;                   //e poi lo rimanda in output come toEdit a ingredient-managemet-component
  }

}
