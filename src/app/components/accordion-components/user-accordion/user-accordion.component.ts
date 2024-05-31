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
	selectedRole = '';

	constructor(public us: UserService, public alert: AlertService) {}

	doEdit(user: user) {
		user.role = this.selectedRole;
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

	doLogicalDelete(user: user) {
		this.us.delete(`Authentication/Delete/${user.id}`).subscribe({
			next: () => {
				user.isDeleted = true;
				this.us.setFilteredList();
				this.alert.showSuccess('Account eliminato con successo!');
			},
			error: (error) => {
				this.alert.showError('Errore, non è stato possibile eliminare l\'account!');
				console.error(error);
			}
		});
	}

	doLogicalRestore(user: user) {
		this.us.delete(`Authentication/Restore/${user.id}`).subscribe({
			next: () => {
				user.isDeleted = false;
				this.us.setFilteredList();
				this.alert.showSuccess('Account riabilitato con successo!');
			},
			error: (error) => {
				this.alert.showError('Errore, non è stato possibile recuperare l\'account!');
				console.error(error);
			}
		});
	}

	computeRole(user: user) {
		switch(user.role) {
			case this.us.allRoles.Admin:
				this.selectedRole = this.us.allRoles.Admin;
				break;
			case this.us.allRoles.Operator:
				this.selectedRole = this.us.allRoles.Operator;
				break;
			case this.us.allRoles.Customer:
				this.selectedRole = this.us.allRoles.Customer;
				break;
		}
	}

	computeUserName(user: user): string {
		if(user.isDeleted)
			return `<strong><s class="text-muted">${user.username}</s></strong>&nbsp&nbsp | &nbsp&nbsp${user.role}`;

		return `<strong>${user.username}</strong>&nbsp&nbsp | &nbsp&nbsp${user.role}`;
	}
}
