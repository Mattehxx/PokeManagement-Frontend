import { Component, EventEmitter, inject, Input, input, Output, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { productAdmin, toAddProduct } from '../../../models/product.model';
import { GenericService } from '../../../services/generic.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ingredient } from '../../../models/ingredient.model';
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

  
  loadIngs(){
    this.toAddIngredients = this.ingredients.map(i=> ({
      id:i.id,
      name:i.name,
      confirm:false
    }));
    return this.toAddIngredients;
  }
  constructor(protected service:GenericService<toAddProduct>){
    this.toAdd = {
      id : 0,
      name: "",
      description: "",
      price: 0,
      isDeleted: false,
      productTypeId: 0,
      productIngredients: []
    }
    
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
