import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { login, register } from '../../models/auth.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { PageService } from '../../services/page.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	user: register = {
		name: '',
		surname: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}

	constructor(public as: AuthService, public alert: AlertService, public loginComp: LoginComponent, public ps: PageService) { }

	doRegister() {
		this.as.register(this.user).subscribe({
			next: (registerResponse) => {
				this.alert.showSuccess('Registrazione effettuata con successo;');
				this.loginComp.doLogin(this.user.username, this.user.password);
				this.ps.isInRegisterPage = false;
			},
			error: (registerError) => {
				this.alert.showError('Non è stato possibile eseguire la registrazione!');
				console.error(registerError);
			}
		})
	}
}
