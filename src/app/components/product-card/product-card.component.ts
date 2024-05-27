import { Component, Input } from '@angular/core';
import { product } from '../../models/product.model';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
	@Input() product: product = {
		id: 0,
		name: 'default',
		description: 'default',
		price: 0,
		isDeleted: false,
		productIngredients: []
	};

	constructor(public os: OrderService) {}
}
