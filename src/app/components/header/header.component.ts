import { Component, EventEmitter, Injectable, Input, Output, input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PageService } from '../../services/page.service';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})

@Injectable({ providedIn: 'any' })

export class HeaderComponent {
	@Input() title = '';
	
	constructor(public as: AuthService, public ps: PageService, public os: OrderService) { }

	showLoginPage() {
		if(this.ps.isInLoginPage || this.ps.isInRegisterPage) {
			this.ps.isInLoginPage = false;
			this.ps.isInRegisterPage = false;
		}
		else {
			this.ps.isInLoginPage = true;
			this.ps.isInRegisterPage = false;
		}
	}

	showCartPage() {
		this.ps.isInCartPage = !this.ps.isInCartPage;
	}
}
