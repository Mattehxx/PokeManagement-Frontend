import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from '../../@modals-components/modal-confirm/modal-confirm.component';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { user } from '../../../models/auth.model';

@Component({
	selector: 'app-user-accordion',
	standalone: true,
	imports: [NgbAccordionModule, FormsModule, CommonModule, NgbdModalBasic],
	templateUrl: './user-accordion.component.html',
	styleUrl: './user-accordion.component.scss'
})
export class UserAccordionComponent {
	isAdmin = false;
	isOperator = false;
	isCustomer = false;

	constructor(public us: UserService, public alert: AlertService) {}

	doEdit(user: user) {
		this.us.put('Authentication/Edit', user).subscribe({
			next: () => {
				this.alert.showSuccess('Account modificato con succeso');
			},
			error: (error) => {
				this.alert.showError('Errore, non è stato possibile modificare l\'account!');
				console.error(error);
			}
		})
	}

	computeRole(user: user) {
		switch(user.role) {
			case this.us.allRoles.Admin:
				this.isAdmin = true;
				this.isOperator = false;
				this.isCustomer = false;
				break;
			case this.us.allRoles.Operator:
				this.isOperator = true;
				this.isAdmin = false;
				this.isCustomer = false;
				break;
			case this.us.allRoles.Customer:
				this.isCustomer = true;
				this.isAdmin = false;
				this.isOperator = false;
				break;
		}
	}
}
