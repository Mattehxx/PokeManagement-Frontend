import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { productDetail } from '../../models/product.model';
import { AlertService } from '../../services/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { productIngredient } from '../../models/product-ingredient.model';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [CommonModule, FormsModule, FontAwesomeModule],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss'
})
export class CartComponent {
	faPlus = faPlus;
	faMinus = faMinus;

	constructor(public prodS: ProductService, public ps: PageService, public os: OrderService, public alert: AlertService) {}

	getIncludedIngredients(product: productDetail): Array<productIngredient> {
		return product.productIngredients.filter(i => i.isIncluded);
	}

	getNotIncludedIngredients(product: productDetail): Array<productIngredient> {
		return product.productIngredients.filter(i => !i.isIncluded);
	}

	addIngredient(product: productDetail , ingredient: productIngredient) {
		this.os
	}
}
