import { Component, Input, Output } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { productAdmin, toAddProduct } from '../../../models/product.model';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { element } from '../../../models/element.model';
import { productIngredient } from '../../../models/product-ingredient.model';
import { NgbdModalBasic } from "../../@modals-components/modal-confirm/modal-confirm.component";
import { ModalAddProductComponent } from "../../@modals-components/modal-add-product/modal-add-product.component";

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

  isDeletedShown: boolean = false;
  productType: element;
  //productIngredients: Array<productIngredient> = []


  constructor() {
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
  getToAdd(p:toAddProduct){
    //fare la post
    //aggiungere a products
  }

}
