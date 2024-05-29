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
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { CartComponent } from "../cart/cart.component";
import { OrderTypeComponent } from "../order-type/order-type.component";
import { OrderManagementComponent } from "../order-management/order-management.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, LoginComponent, RegisterComponent, HomeAdminComponent, CartComponent, OrderTypeComponent, OrderManagementComponent]
})
export class AppComponent {
	title: string = 'F&F';
	isInLoginPage: boolean = false;
	isInRegisterPage: boolean = false;

	constructor(public as: AuthService, public alert: AlertService, public ps: PageService) {
		this.as.getUserRole();
	}
}
