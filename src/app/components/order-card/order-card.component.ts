import { Component, Input } from '@angular/core';
import { order, orderForManagement } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../services/alert.service';
import { OrderForManagementService } from '../../services/orderForManagement.service';
import { orderDetailForManagement } from '../../models/order-detail.model';
import { IngredientAccordionComponent } from '../accordion-components/ingredient-accordion/ingredient-accordion.component';
import { ingredient } from '../../models/ingredient.model';
import { productIngredient, productIngredientBasic } from '../../models/product-ingredient.model';

@Component({
	selector: 'app-order-card',
	standalone: true,
	imports: [CommonModule, NgbModule],
	templateUrl: './order-card.component.html',
	styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
	@Input() order: order | undefined;

	orderDetailed: orderForManagement | undefined;
	isCollapsed: boolean = true;
	count: number = 1;

	constructor(public os: OrderForManagementService, public alert: AlertService) {}

	getProductIngredients(orderDetail: orderDetailForManagement) {
		if(!orderDetail || !orderDetail.product.productIngredients)
			return;

		let fromProduct = orderDetail.product.productIngredients;

		let fromPersonalization = orderDetail.personalizations?.map(pers => ({
			id: pers.productIngredientId,
			amount: pers.amount,
			ingredientName: pers.productIngredient.ingredientName,
			maxAllowed: pers.productIngredient.maxAllowed,
			isIncluded: pers.productIngredient.isIncluded
		}));
		
		let allIngredients: Array<productIngredientBasic> = [];

		fromProduct.forEach(i => {
			let ingredient = fromPersonalization.find(ifp => i.id === ifp.id);
			if(!ingredient)
				ingredient = i;
			allIngredients.push(ingredient);
		});
		
		return allIngredients;
	}

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
		if (!this.isCollapsed) {
			this.os.getSingle(`Order/Get/${this.order?.id}`).subscribe({
				next: (response) => {
					this.orderDetailed = response;
				},
				error: (error) => {
					this.alert.showError('Errore, non è stato possibile recuperare l\'ordine');
					console.error(error);
				}
			});
		}
	}
}
