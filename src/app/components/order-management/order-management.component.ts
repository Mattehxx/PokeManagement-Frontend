import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PageService } from '../../services/page.service';
import { OrderService } from '../../services/order.service';
import { order } from '../../models/order.model';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderCardComponent } from "../order-card/order-card.component";
import { OrderForManagementService } from '../../services/orderForManagement.service';

@Component({
    selector: 'app-order-management',
    standalone: true,
    templateUrl: './order-management.component.html',
    styleUrl: './order-management.component.scss',
    imports: [CommonModule, NgbModule, OrderCardComponent]
})
export class OrderManagementComponent {
	orders: Array<order> | undefined;
	

	constructor(public as: AuthService, public ps: PageService, public os: OrderForManagementService, public alert: AlertService) {
		this.os.getOrderToExec().subscribe({
			next: (response) => {
				response = response.filter(r => !r.isCompleted);
				response = response.sort((prev, curr) => Date.parse(prev.insertDate) - Date.parse(curr.insertDate));
				this.orders = response;
			},
			error: (error) => {
				this.alert.showError('Errore, non è possibile recuperare gli ordini!');
				console.error(error);
			}
		});
	}

	convertDate(dateString: string) {
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
}
