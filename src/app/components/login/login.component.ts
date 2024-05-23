import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { login } from '../../models/auth.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../register/register.component";
import { HeaderComponent } from '../header/header.component';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormsModule, CommonModule, RegisterComponent]
})

@Injectable({providedIn: 'any'})

export class LoginComponent {
	user: login = {
		username: '',
		password: ''
	}

	constructor(public as: AuthService, public alert: AlertService, public ps: PageService) {}

	doLogin(username: string = '', password: string = '') {
		if(username != '' && password != '') {
			this.user.username = username;
			this.user.password = password;
		}

		this.as.login(this.user).subscribe({
			next: (response) => {
				this.alert.showSuccess('Accesso effettuato!');
				this.ps.isInLoginPage = false;
			},
			error: (error) => {
				this.alert.showError('Non è stato possibile eseguire l\'accesso al profilo!');
				console.error(error);
			}
		})
	}

	doLogout() {
		if(!this.as.logout())
			this.alert.showError('Non è stato possibile eseguire la disconnessione!');

		this.alert.showSuccess('Disconnessione eseguita!');
	}

	showRegisterPage() {
		this.ps.isInRegisterPage = true;
		this.ps.isInLoginPage = false;
	}
}
