import { Component } from '@angular/core';
import { CategoryCardComponent } from "../category-card/category-card.component";
import { element } from '../../models/element.model';
import { HttpClientModule } from '@angular/common/http';
import { ProductTypeService } from '../../services/product-type.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageService } from '../../services/page.service';

@Component({
	selector: 'app-home',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	imports: [CategoryCardComponent, HttpClientModule, FormsModule, CommonModule]
})
export class HomeComponent {
	productTypes: Array<element> | undefined;
	
	constructor(public _pts: ProductTypeService, public _as: AuthService, public ps: PageService) {
		this._pts.getAll('ProductType').subscribe({
			next: (response) => {
				this.productTypes = response;
			}
		});
	}
}
