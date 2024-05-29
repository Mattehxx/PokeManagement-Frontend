import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { modalConfirmAction } from '../../../models/modal-confirm.model';

@Component({
	selector: 'app-modal-confirm',
	standalone: true,
	imports: [NgbDatepickerModule,CommonModule,FormsModule],
	templateUrl: './modal-confirm.component.html',
})
export class NgbdModalBasic {
	private modalService = inject(NgbModal);
	closeResult = '';
	isDeletedMode:boolean = false;
	@Input()
	changes: string = "";
	@Output()
	confirm = new EventEmitter<modalConfirmAction>();


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
	removeDelMode(){
		setTimeout(()=>this.isDeletedMode=false,300);
	}
	save(){
		let c: modalConfirmAction = {
			action: this.isDeletedMode ? "delete" : "edit",
			confirm: true
		}
		this.confirm.emit(c);
	}
	notSave(){
		let c: modalConfirmAction = {
			action: "",
			confirm: false
		}
		this.confirm.emit(c);
	}
	
}