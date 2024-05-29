import { Component } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { product } from '../../models/product.model';
import { ProductManagementComponent } from "../product-management/product-management.component";
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IngredientManagementComponent } from "../ingredient-management/ingredient-management.component";

@Component({
    selector: 'app-home-admin',
    standalone: true,
    templateUrl: './home-admin.component.html',
    styleUrl: './home-admin.component.scss',
    imports: [ProductManagementComponent, FormsModule, CommonModule, IngredientManagementComponent]
})
export class HomeAdminComponent {
  isProdViewMode: boolean = false;
  isIngredientViewMode: boolean = false;
  isUserViewMode: boolean = false;
  idOrdersHistoryViewMode: boolean = false;
  constructor() {

  }




  toggleViewMode(name: string) {
    this.resetViewMode();
    switch (name.toLowerCase()) {
      case 'products':
        this.isProdViewMode = true;
        break;
      case 'ingredients':
        this.isIngredientViewMode = true;
        break;
      case 'users':
        this.isUserViewMode = true;
        break;
      case 'history':
        this.idOrdersHistoryViewMode = true;
        break;
    }
  }
  resetViewMode() {
    this.isProdViewMode = false;
    this.isIngredientViewMode = false;
    this.isUserViewMode = false;
    this.idOrdersHistoryViewMode = false;
  }
  isNotViewMode(){
    return !this.isIngredientViewMode && !this.idOrdersHistoryViewMode && !this.isProdViewMode && !this.isUserViewMode;
  }
}
