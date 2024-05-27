import { Component, Input } from '@angular/core';
import { order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../services/order.service';
import { orderDetail } from '../../models/order-detail.model';
import { AlertService } from '../../services/alert.service';

@Component({
	selector: 'app-order-card',
	standalone: true,
	imports: [CommonModule, NgbModule],
	templateUrl: './order-card.component.html',
	styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
	@Input() order: order | undefined;

	orderDetail: order | undefined;
	isCollapsed: boolean = true;

	constructor(public os: OrderService, public alert: AlertService) {}

	convertDate(dateString: string | undefined) {
		if(!dateString)
			return '';

		let newDate = new Date(dateString);
		return newDate.toLocaleDateString('it-IT', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}

	toggleCollapse() {
		this.isCollapsed = !this.isCollapsed;
		console.log('ORDER', this.order);
		if (!this.isCollapsed) {
			this.os.getSingle(`Order/Get/${this.order?.id}`).subscribe({
				next: (response) => {
					this.orderDetail = response;
				},
				error: (error) => {
					this.alert.showError('Errore, non è stato possibile recuperare l\'ordine');
					console.error(error);
				}
			});
		}
	}
}
