import { Component, Input } from '@angular/core';
import { product } from '../../models/product.model';

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
	@Input() product: product = {
		productId: 0,
		name: 'default',
		description: 'default',
		price: 0,
		isDeleted: false
	};

	
}
