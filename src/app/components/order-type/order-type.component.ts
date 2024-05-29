import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { element, orderType } from '../../models/element.model';
import { OrderTypeService } from '../../services/order-type.service';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-order-type',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './order-type.component.html',
	styleUrl: './order-type.component.scss'
})
export class OrderTypeComponent {
	defaultType: string = 'in loco';
	defaultOperatorType: string = 'drive through';

	constructor(public ot: OrderTypeService, public alert: AlertService, public as: AuthService) {
		if(this.as.isOperator)
			this.defaultType = this.defaultOperatorType;

		this.ot.getAll(`OrderType`).subscribe({
			next: (response) => {
				response = this.as.isOperator ? 
					response.filter(resp => resp.description.toLowerCase() === this.defaultType) : 
					response.filter(resp => resp.description.toLowerCase() != this.defaultOperatorType);

				this.ot.orderTypes = response.map(resp => ({
					id: resp.id,
					description: resp.description,
					isActive: resp.description.toLowerCase() === this.defaultType
				}));
			},
			error: (error) => {
				this.alert.showError(error);
				console.error(error);
			}
		});
	}

	activeButton(orderType: orderType) {
		this.ot.orderTypes.forEach(ot => ot.isActive = false);
		orderType.isActive = true;
	}
}
