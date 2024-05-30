import { Component, Input, Output } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { product, productAdmin, toAddProduct } from '../../../models/product.model';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { element } from '../../../models/element.model';
import { productIngredient } from '../../../models/product-ingredient.model';
import { NgbdModalBasic } from "../../@modals-components/modal-confirm/modal-confirm.component";
import { ModalAddProductComponent } from "../../@modals-components/modal-add-product/modal-add-product.component";
import { modalConfirmAction } from '../../../models/modal-confirm.model';
import { GenericService } from '../../../services/generic.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-product-accordion',
  standalone: true,
  templateUrl: './product-accordion.component.html',
  styleUrl: './product-accordion.component.scss',
  imports: [NgbAccordionModule, FormsModule, CommonModule, NgbdModalBasic, ModalAddProductComponent]
})
export class ProductAccordionComponent {
  @Input()
  products: Array<productAdmin> = [];

  @Output()
  toEdit: productAdmin;
  toEditString() {
    return `Nome:${this.toEdit.name}\n
    Descrizione:${this.toEdit.description}\n
    Prezzo:${this.toEdit.price}\n
    Ingredienti:${this.toEdit.productIngredients.map(x => x.ingredientName + "\n")}`
  }

  isDeletedShown: boolean = false;
  productType: element;
  //productIngredients: Array<productIngredient> = []


  constructor(protected service: GenericService<productAdmin>, protected basicService: GenericService<toAddProduct>,protected alertService:AlertService) {
    console.log(this.products);
    this.productType = {
      id: 0,
      description: ""
    }
    this.toEdit = {
      id: 0,
      name: "",
      price: 0,
      description: "",
      isDeleted: false,
      productType: this.productType,
      productIngredients: []
    };  //prodotto da modificare
  }




  getToEditProduct(p: productAdmin) {  //prende in input il prodotto da modificare  
    this.toEdit = p;                   //e poi lo rimanda in output come toEdit a product-managemet-component
  }
  getToAdd(p: toAddProduct) {
    //fare la post
    //aggiungere a products
  }
  logicalDelete() {
    let url = `Product/LogicalDelete/${this.toEdit.id}`;
    this.service.delete(url).subscribe({
      next: (Response) => {
        console.log(Response);
        let i = this.products.findIndex(prod => prod.id == this.toEdit.id);
        if (i > -1) {
          this.products[i].isDeleted = true;
          this.alertService.showSuccess("prodotto eliminato correttamente");
        }
      }, error: (error) => {
        console.log(error);
        this.alertService.showError("il prodotto non è stato eliminato");
      }
    });
  }
  logicalRestore(item: product) {
    let url = `Product/LogicalRestore/${item.id}`;
    this.service.delete(url).subscribe({
      next: (Response) => {
        console.log(Response);
        let i = this.products.findIndex(prod => prod.id == item.id);
        if (i > -1) {
          this.products[i].isDeleted = false;
        }
        this.alertService.showSuccess("prodotto ripristinato correttamente");
      }, error: (error) => {
        console.log(error);
        this.alertService.showError("il prodotto non è stato ripristinato");
      }
    });
  }
  put() {
    this.service.put("Product/Edit", this.toEdit).subscribe({
      next: (Response) => {
        let i = this.products.findIndex(ing => ing.id == Response.id);
        if (i > -1) {
          this.products[i] = Response;
        }
        this.alertService.showSuccess("prodotto modificato correttamente");
      }, error: (error) => {
        console.log(error);
        this.alertService.showError("il prodotto non è stato modificato");
      }
    });
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
