import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss'
})
export class CartComponent {
	constructor(public ps: PageService, public os: OrderService) {}
}
