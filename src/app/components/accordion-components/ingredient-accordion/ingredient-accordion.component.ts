import { Component, Input, Output } from '@angular/core';
import { ingredient, toAddIngredient } from '../../../models/ingredient.model';
import { element } from '../../../models/element.model';
import { NgbdModalBasic } from "../../@modals-components/modal-confirm/modal-confirm.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddIngredientComponent } from "../../@modals-components/modal-add-ingredient/modal-add-ingredient.component";
import { GenericService } from '../../../services/generic.service';
import { modalConfirmAction } from '../../../models/modal-confirm.model';

@Component({
  selector: 'app-ingredient-accordion',
  standalone: true,
  templateUrl: './ingredient-accordion.component.html',
  styleUrl: './ingredient-accordion.component.scss',
  imports: [NgbdModalBasic, NgbAccordionModule, CommonModule, FormsModule, ModalAddIngredientComponent]
})
export class IngredientAccordionComponent {
  @Input()
  ingredients: Array<ingredient> = []
  @Output()
  ingredientType: element;
  //productIngredients: Array<productIngredient> = []
  toEdit: ingredient;
  toEditString() {
    return `Nome:${this.toEdit.name}\n
    Descrizione:${this.toEdit.description}\n
    Calorie:${this.toEdit.calories}\n
    Allergene:${this.toEdit.allergen}`
  }
  isDeletedShown: boolean = false;

  constructor(protected service: GenericService<ingredient>, protected basicService: GenericService<toAddIngredient>) {
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


  getToEditIngredient(ing: ingredient) {  //prende in input ingrediente da modificare  
    this.toEdit = ing;                   //e poi lo rimanda in output come toEdit a ingredient-managemet-component
  }
  getToAdd(ing: toAddIngredient) {
    this.basicService.post("Ingredient/Add", ing).subscribe({
      next: (Response) => {
        console.log(Response);
      }, error: (error) => {
        console.log(error);
        return false;
      }
    });
    let x: ingredient = {
      id: this.ingredients[this.ingredients.length - 1].id++,
      description: ing.description,
      allergen: ing.allergen,
      name: ing.name,
      additionalCost: ing.additionalCost,
      calories: ing.calories,
      isDeleted: ing.isDeleted,
      ingredientTypeId: ing.ingredientTypeId,
      ingredientType: this.ingredients[0].ingredientType
    }
    this.ingredients.push(x);
  }
  logicalDelete() {
    let url = `Ingredient/LogicalDelete/${this.toEdit.id}`;
    this.service.delete(url).subscribe({
      next: (Response) => {
        console.log(Response);
        let i = this.ingredients.findIndex(ing => ing.id == this.toEdit.id);
        this.ingredients[i].isDeleted = true;
        return true;
      }, error: (error) => {
        console.log(error);
        return false;
      }
    });
  }
  logicalRestore(item:ingredient) {
    let url = `Ingredient/LogicalRestore/${item.id}`;
    this.service.delete(url).subscribe({
      next: (Response) => {
        console.log(Response);
        let i = this.ingredients.findIndex(ing => ing.id == item.id);
        this.ingredients[i].isDeleted = false;
        return true;
      }, error: (error) => {
        console.log(error);
        return false;
      }
    });
  }
  put(): boolean {
    this.service.put("Ingredient/Edit", this.toEdit).subscribe({
      next: (response) => {
        let i = this.ingredients.findIndex(ing => ing.id == response.id);
        this.ingredients[i] = response;
      }, error: (error) => {
        console.log(error);
        return false;
      }
    });
    return true;
  }
  editAction(confirm: modalConfirmAction) {
    if (confirm.confirm) {
      if (confirm.action == "delete") {
        this.logicalDelete();
      } else if (confirm.action == "edit") {
        this.put();
      }
    }
  }

}
