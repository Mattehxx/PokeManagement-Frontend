import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { product, productDetail } from '../../models/product.model';
import { AlertService } from '../../services/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { productIngredient } from '../../models/product-ingredient.model';
import { OrderTypeComponent } from "../order-type/order-type.component";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    imports: [CommonModule, FormsModule, FontAwesomeModule, OrderTypeComponent]
})
export class CartComponent {

	constructor(public prodS: ProductService, public ps: PageService, public os: OrderService, public as: AuthService, public alert: AlertService) {}

	getIncludedIngredients(product: productDetail): Array<productIngredient> {
		return product.productIngredients.filter(i => i.isIncluded);
	}

	getNotIncludedIngredients(product: productDetail): Array<productIngredient> {
		return product.productIngredients.filter(i => !i.isIncluded);
	}

	doComputeCart() {
		if(!this.as.isLogged && !this.as.loginDenied) {
			this.ps.isLoginFromCartPage = true;
			this.ps.returnToLoginPage();
		}
		else
			this.os.computeOrder();
	}

	async removeProductFromCart(product: productDetail) {
		if(!await this.alert.showModal('Sei sicuro di voler rimouvere questo prodotto?'))
			return;

		this.os.removeFromCart(product);
	}

	async emptyCart() {
		if(!await this.alert.showModal('Sei sicuro di voler svuotare il carrello?'))
			return;

		this.os.cart = [];
		this.ps.returnToHomePage();
	}
}
