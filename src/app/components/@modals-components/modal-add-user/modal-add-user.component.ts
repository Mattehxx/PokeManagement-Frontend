import { CommonModule } from '@angular/common';
import { Component, TemplateRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { register, user } from '../../../models/auth.model';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-modal-add-user',
	standalone: true,
	imports: [NgbDatepickerModule, CommonModule, FormsModule],
	templateUrl: './modal-add-user.component.html',
	styleUrl: './modal-add-user.component.scss'
})
export class ModalAddUserComponent {
	private modalService = inject(NgbModal);

	user: register;
	role: string = 'Operator';

	constructor(public us: UserService, public as:AuthService, public alert: AlertService) {
		this.user = {
			username: '',
			email: '',
			name: '',
			surname: '',
			password: '',
			confirmPassword: ''
		};
	}

	addUser() {
		if(!this.checkIfUserIsValid()) {
			this.alert.showWarning('Compila tutti i campi');
			return;
		}

		if(this.role === this.us.allRoles.Admin) {
			this.as.registerAdmin(this.user).subscribe({
				next: () => {
					this.alert.showSuccess('Utente creato con successo!');
				},
				error: (error) => {
					this.alert.showError('Errore, non è stato possibile creare l\'account!');
					console.error(error);
				}
			});
		}
		else {
			this.as.registerOperator(this.user).subscribe({
				next: () => {
					this.alert.showSuccess('Utente creato con successo!');
				},
				error: (error) => {
					this.alert.showError('Errore, non è stato possibile creare l\'account!');
					console.error(error);
				}
			});
		}
	}

	checkIfUserIsValid(): boolean {
		return this.user.username != '' && this.user.email != '' && this.user.name != '' && this.user.surname != ''
			&& this.user.password != '' && this.user.confirmPassword != '';
	}

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { windowClass: 'modal-lg' });
	}
}
