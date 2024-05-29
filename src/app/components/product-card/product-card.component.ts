import { Component, Input } from '@angular/core';
import { product } from '../../models/product.model';
import { OrderService } from '../../services/order.service';
import { AlertService } from '../../services/alert.service';

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

	constructor(public os: OrderService, public alert: AlertService) {}

	async addProductToCart() {
		const ingredients = this.computeProductIngredients(this.product);
		if(!await this.alert.showModal('Vuoi davvero aggiungere questo prodotto al carrello?', ingredients))
			return;

		this.os.addToCart(this.product);
	}

	private computeProductIngredients(product: product) {
		let html: string = `
			<div class="product-ingredient-card shadow">
				<div class="d-flex justify-content-between align-items-center mb-2">
					<h3 class="d-flex m-0 fw-bold">${product.name}</h3>
					<h3 class="d-flex m-0 fw-bold">${product.price} €</h3>
				</div>
				<div class="h-line bg-secondary w-100"></div>
				<ul class="my-2">`;

		product.productIngredients.forEach(pi => {
			html += `<li class="text-start">${pi.ingredientName}, ${pi.amount}</li>`;
		})

		return html += `</ul></div>`;
	}
}
