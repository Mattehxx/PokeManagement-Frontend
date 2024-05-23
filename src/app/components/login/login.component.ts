import { Component } from '@angular/core';
import { login } from '../../models/auth.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	user: login = {
		username: '',
		password: ''
	}

	constructor(public as: AuthService, public alert: AlertService) {}

	doLogin() {
		this.as.login(this.user).subscribe({
			next: (response) => {
				this.alert.showSuccess('Accesso effettuato');
			},
			error: (error) => {
				console.error(error);
			}
		})
	}

	doLogout() {
		if(!this.as.logout())
			this.alert.showError('Non è stato possibile eseguire il logout');

		this.alert.showSuccess('Disconnessione eseguita');
	}
}
