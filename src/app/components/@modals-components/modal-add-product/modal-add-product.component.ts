import { Component, EventEmitter, inject, Input, input, Output, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { productAdmin, toAddProduct } from '../../../models/product.model';
import { GenericService } from '../../../services/generic.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ingredient } from '../../../models/ingredient.model';
import { IngredientService } from '../../../services/ingredient.service';
import { AlertService } from '../../../services/alert.service';
import { productIngredient } from '../../../models/product-ingredient.model';
@Component({
  selector: 'app-modal-add-product',
  standalone: true,
  imports: [NgbDatepickerModule,CommonModule,FormsModule],
  templateUrl: './modal-add-product.component.html',
  styleUrl: './modal-add-product.component.scss'
})
export class ModalAddProductComponent {
  private modalService = inject(NgbModal);
	closeResult = '';
  toAdd : toAddProduct ;
  @Input()
  ingredients:Array<ingredient> = [];
  @Input()
  toAddIngredients : Array<{id:number,name:string,confirm:boolean}> = [];
  @Output()
  getToAddProd = new EventEmitter<toAddProduct>()

  ingredientsToAdd: Array<ingredient> = [];

  
  loadIngs(){
    this.toAddIngredients = this.ingredients.map(i=> ({
      id:i.id,
      name:i.name,
      confirm:false
    }));
    return this.toAddIngredients;
  }
  constructor(protected service:GenericService<toAddProduct>, public is: IngredientService, public alert: AlertService){
    this.toAdd = {
      id : 0,
      name: "",
      description: "",
      price: 0,
      isDeleted: false,
      productTypeId: 0,
      productIngredients: []
    }
    
    this.is.getAll('Ingredient').subscribe({
      next: (response) => {
        this.is.allIngredients = response;
        this.toAddIngredients = this.is.allIngredients.map(i => ({
          id: i.id,
          name: i.name,
          confirm: false
        }))
      },
      error: (error) => {
        this.alert.showError('Errore, non è stato possibile recuperare gli ingredienti');
        console.error(error);
      }
    })
  }


  addIngredient(ingredient: ingredient) {
    if(this.checkIfIngredientIsInList(ingredient)) {
      this.alert.showWarning('Attenzione, ingrediente già aggiunto!');
      return;
    }

    let newIngredient: productIngredient = {
      amount: 1,
      id: 0,
      ingredientId: ingredient.id,
      ingredientName: ingredient.name,
      ingredientPrice: ingredient.additionalCost,
      isDeleted: false,
      isIncluded: true,
      maxAllowed: 2,
      productId: 0
    };

    this.toAdd.productIngredients.push(newIngredient);

    console.log(this.toAdd.productIngredients);
  }

  removeIngredient(ingredient: ingredient) {
    this.toAdd.productIngredients = this.toAdd.productIngredients.filter(i => i.ingredientId != ingredient.id);
  }


  checkIfIngredientIsInList(ingredient: ingredient) {
    return this.toAdd.productIngredients.find(i => i.ingredientId === ingredient.id);
  }

  emitProd(){
    this.getToAddProd.emit(this.toAdd);
  }



/*   post(){
    this.service.post("Product/Api",this.toAdd).subscribe({
      next:(Response) => {
        console.log(Response);
      },error: (error) => {
        console.log(error);
      }
    })   da fare nel parent --> + aggiungere a products (array)
  } */

  //aggiungere get ingredients disponibili per la post



  open(content: TemplateRef<any>) {
		this.modalService.open(content, { windowClass: 'modal-lg' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
