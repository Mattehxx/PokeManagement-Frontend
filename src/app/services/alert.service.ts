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
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        })
    }
}