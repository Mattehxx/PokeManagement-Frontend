import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from '../../@modals-components/modal-confirm/modal-confirm.component';
import { OrderAdminService } from '../../../services/order-admin.service';
import { AlertService } from '../../../services/alert.service';

@Component({
	selector: 'app-order-accordion',
	standalone: true,
	imports: [NgbAccordionModule, FormsModule, CommonModule, NgbdModalBasic],
	templateUrl: './order-accordion.component.html',
	styleUrl: './order-accordion.component.scss'
})
export class OrderAccordionComponent {
	constructor(public os: OrderAdminService, public alert: AlertService) {}

	convertDate(dateString: string | undefined, alsoHours: boolean = true): string {
		if(!dateString)
			return '';

		let newDate = new Date(dateString);

		if(!alsoHours) {
			return newDate.toLocaleDateString('it-IT', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			});
		}

		return newDate.toLocaleDateString('it-IT', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
		
	}
}
