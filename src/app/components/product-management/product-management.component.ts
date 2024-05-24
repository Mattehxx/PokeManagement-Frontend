import { Component } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { product, productAdmin } from '../../models/product.model';
import { productIngredient, productIngredientBasic } from '../../models/product-ingredient.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductAccordionComponent } from "../accordion-components/product-accordion/product-accordion.component";

@Component({
    selector: 'app-product-management',
    standalone: true,
    templateUrl: './product-management.component.html',
    styleUrl: './product-management.component.scss',
    imports: [FormsModule, CommonModule, ProductAccordionComponent]
})
export class ProductManagementComponent {
  constructor(public ProdService: GenericService<productAdmin>) {
    this.getProducts();
  }
  toEditProduct: productAdmin | undefined;
  pokes: Array<productAdmin> = [];
  tacos: Array<productAdmin> = [];
  drinks: Array<productAdmin> = [];
  desserts: Array<productAdmin> = [];






  getProducts() {
    this.ProdService.getAll("Product").subscribe({
      next: (data) => {
        data.forEach((prod) => {
          if (prod.productType.id === 1) { }
          let p: productAdmin = {
            productId: prod.productId,
            name: prod.name,
            description: prod.description,
            price: prod.price,
            isDeleted: prod.isDeleted,
            productType: prod.productType,
            productIngredients: []
          };
          prod.productIngredients.forEach((pi) => {
            let toAdd: productIngredientBasic = {
              id: pi.id,
              amount: pi.amount,
              maxAllowed: pi.maxAllowed,
              isIncluded: pi.isIncluded,
              ingredientName: pi.ingredientName
            }
            p.productIngredients.push(toAdd)
          })
          switch (p.productType.id) {
            case 1:
              this.drinks.push(p);
              break;
            case 2:
              this.pokes.push(p);
              break;
            case 3:
              this.tacos.push(p);
              break;
            case 4:
              this.desserts.push(p);
              break;
          }
        })
      },error:(error) => {
        console.log(error);
      }
    })
  }
}
