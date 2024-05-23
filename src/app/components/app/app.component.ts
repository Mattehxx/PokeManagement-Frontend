import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AlertService } from '../../services/alert.service';
import { RegisterComponent } from "../register/register.component";
import { PageService } from '../../services/page.service';
import { CartComponent } from "../cart/cart.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, LoginComponent, RegisterComponent, CartComponent]
})
export class AppComponent {
	title: string = 'Fast & Foodious';
	isInLoginPage: boolean = false;
	isInRegisterPage: boolean = false;

	constructor(public as: AuthService, public alert: AlertService, public ps: PageService) {
		this.as.getUserRole();
	}
}
