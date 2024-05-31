import { Component } from '@angular/core';
import { OrderAdminService } from '../../services/order-admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderAccordionComponent } from "../accordion-components/order-accordion/order-accordion.component";
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-order-management-admin',
    standalone: true,
    templateUrl: './order-management-admin.component.html',
    styleUrl: './order-management-admin.component.scss',
    imports: [CommonModule, FormsModule, OrderAccordionComponent]
})
export class OrderManagementAdminComponent {
	constructor(public os: OrderAdminService, public alert: AlertService) {
		this.doGetAll();
	}

	doGetAll() {
		this.os.getAll('Order').subscribe({
			next: (response) => {
				this.os.allOrders = response;
				this.os.setFilteredList();
			},
			error: (error) => {
				this.alert.showError('Errore, non è stato possibile recuperare gli ordini!');
				console.error(error);
			}
		});
	}

	async doHistory() {
		if(this.os.dates.startDate == '' || this.os.dates.endDate == '') {
			this.alert.showWarning('Attenzione, seleziona due date valide!');
			return;
		}

		if(!await this.alert.showModal('Storicizzazione', 
			`Vuoi davvero storicizzare gli ordini da ${this.os.dates.startDate} a ${this.os.dates.endDate} ?`))
			return;

		this.os.execHistoryStoredProcedure().subscribe({
			next: (response) => {
				this.alert.showSuccess('Ordini storicizzati con successo!');
				this.doGetAll();
			},
			error: (error) => {
				this.alert.showError('Errore, nessun ordine storicizzato!');
				console.error(error);
			}
		})
	}
}
