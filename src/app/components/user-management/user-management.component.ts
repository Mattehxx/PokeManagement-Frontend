import { Component } from '@angular/core';
import { UserAccordionComponent } from "../accordion-components/user-accordion/user-accordion.component";
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalAddUserComponent } from "../@modals-components/modal-add-user/modal-add-user.component";

@Component({
    selector: 'app-user-management',
    standalone: true,
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.scss',
    imports: [UserAccordionComponent, FormsModule, CommonModule, ModalAddUserComponent]
})
export class UserManagementComponent {

	constructor(public us: UserService, public alert: AlertService) {
		this.us.getAll('Authentication/GetAllUsers').subscribe({
			next: (response) => {
				this.us.allUsers = response;
				this.us.setFilteredList();
			},
			error: (error) => {
				this.alert.showError('Errore, non è stato possibile recuperare gli utenti!');
				console.error(error);
			}
		})
	}
}
