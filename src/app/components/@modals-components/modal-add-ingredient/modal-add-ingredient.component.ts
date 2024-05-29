import { Component, EventEmitter, inject, Input, input, Output, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { productAdmin, toAddProduct } from '../../../models/product.model';
import { GenericService } from '../../../services/generic.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ingredient, toAddIngredient } from '../../../models/ingredient.model';
import { element } from '../../../models/element.model';

@Component({
  selector: 'app-modal-add-ingredient',
  standalone: true,
  imports: [NgbDatepickerModule,CommonModule,FormsModule],
  templateUrl: './modal-add-ingredient.component.html',
  styleUrl: './modal-add-ingredient.component.scss'
})
export class ModalAddIngredientComponent {
  private modalService = inject(NgbModal);
	closeResult = '';
  toAdd : toAddIngredient ;
  @Input()
  ingredientType : element = {id:0,description:""}
  @Output()
  getToAddProd = new EventEmitter<toAddIngredient>()
  constructor(protected service:GenericService<toAddIngredient>){
    this.toAdd = {
      id : 0,
      name: "",
      description: "",
      additionalCost: 0,
      isDeleted: false,
      allergen: false,
      calories: 0,
      ingredientTypeId: 0
      }
  }
  emitIng(){
    this.toAdd.ingredientTypeId = this.ingredientType.id;
    if(this.toAdd.ingredientTypeId != 0){
      this.getToAddProd.emit(this.toAdd);
    }
  }












  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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
