import { Component } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { product } from '../../models/product.model';
import { ProductManagementComponent } from "../product-management/product-management.component";
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IngredientManagementComponent } from "../ingredient-management/ingredient-management.component";
import { PageService } from '../../services/page.service';
import { UserManagementComponent } from "../user-management/user-management.component";
import { OrderManagementAdminComponent } from "../order-management-admin/order-management-admin.component";

@Component({
    selector: 'app-home-admin',
    standalone: true,
    templateUrl: './home-admin.component.html',
    styleUrl: './home-admin.component.scss',
    imports: [ProductManagementComponent, FormsModule, CommonModule, IngredientManagementComponent, UserManagementComponent, OrderManagementAdminComponent]
})
export class HomeAdminComponent {
  
  constructor(protected ps:PageService) {

  }




  toggleViewMode(name: string) {
    this.resetViewMode();
    switch (name.toLowerCase()) {
      case 'products':
        this.ps.isProdViewMode = true;
        break;
      case 'ingredients':
        this.ps.isIngredientViewMode = true;
        break;
      case 'users':
        this.ps.isUserViewMode = true;
        break;
      case 'history':
        this.ps.idOrdersHistoryViewMode = true;
        break;
    }
  }
  resetViewMode() {
    this.ps.isProdViewMode = false;
    this.ps.isIngredientViewMode = false;
    this.ps.isUserViewMode = false;
    this.ps.idOrdersHistoryViewMode = false;
  }
  isNotViewMode(){
    return !this.ps.isIngredientViewMode && !this.ps.idOrdersHistoryViewMode && !this.ps.isProdViewMode && !this.ps.isUserViewMode;
  }
}
