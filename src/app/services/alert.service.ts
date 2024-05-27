import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class AlertService {
    showSuccess(message: string) {
        Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Successo',
            text: message,
            position: 'top-start',
            showConfirmButton: false,
            timer: 2000
        })
    }

    showError(message: string) {
        Swal.fire({
            toast: true,
            icon: 'error',
            title: 'Errore',
            text: message,
            position: 'top-start',
            showConfirmButton: false,
            timer: 2000
        })
    }

    showWarning(message: string) {
        Swal.fire({
            toast: true,
            icon: 'warning',
            title: 'Attenzione',
            text: message,
            position: 'top-start',
            showConfirmButton: false,
            timer: 2000
        })
    }

    showInfo(message: string) {
        Swal.fire({
            toast: true,
            icon: 'info',
            title: 'Info',
            text: message,
            position: 'top-start',
            showConfirmButton: false,
            timer: 2000
        })
    }

    async showModal(message: string): Promise<boolean> {
        const response = await Swal.fire({
            title: message,
            showCancelButton: true,
            confirmButtonText: "Conferma",
            cancelButtonText: "Annulla"
        });

        if(!response.isConfirmed)
            return false;

        return true;
    }
}