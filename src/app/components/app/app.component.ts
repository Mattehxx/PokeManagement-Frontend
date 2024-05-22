import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, LoginComponent]
})
export class AppComponent {
	title: string = 'Fast & Foodious';
	isInLoginPage: boolean = false;

	constructor(public as: AuthService) { }

	showLoginPage(retIsInLoginPage: boolean) {
		this.isInLoginPage = retIsInLoginPage;
	}
}
