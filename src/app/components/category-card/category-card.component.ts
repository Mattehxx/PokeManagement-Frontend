import { Component, Input } from '@angular/core';
import { element } from '../../models/element.model';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
    selector: 'app-category-card',
    standalone: true,
    templateUrl: './category-card.component.html',
    styleUrl: './category-card.component.scss',
    imports: [NgbModule, CommonModule, ProductCardComponent]
})
export class CategoryCardComponent {
	@Input() productType: element = {id: 0, description: ''};

	isCollapsed: boolean = true;
	products: Array<product> | undefined;

	constructor(public _ps: ProductService, public _as: AuthService) {
		
	}

	toggleCollapse() {
		this.isCollapsed = !this.isCollapsed;
		if (!this.isCollapsed)
			this.getProductsByType();
	}

	getProductsByType() {
		this._ps.getByType(`Product/GetByCategoryId/${this.productType.id}`).subscribe({
			next: (response) => {
				this.products = response.filter(r => !r.isDeleted);
			}
		});
	}
}
