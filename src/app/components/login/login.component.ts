import { Component } from '@angular/core';
import { login } from '../../models/auth.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	user: login = {
		username: '',
		password: ''
	}

	constructor(private as: AuthService, public alert: AlertService) {}

	doLogin() {
		this.as.login(this.user).subscribe({
			next: (response) => {
				this.alert.showSuccess('Accesso effettuato')
			},
			error: (error) => {
				console.error(error);
			}
		})
	}

	doLogout() {
		this.as.logout();
	}
}
