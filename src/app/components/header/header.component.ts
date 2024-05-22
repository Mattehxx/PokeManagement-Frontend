import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title = '';

  isInLoginPage: boolean = false;

  constructor(public as: AuthService) {}

  @Output() loginBtnClicked: EventEmitter<boolean> = new EventEmitter<boolean>

  showLoginPage() {
    this.isInLoginPage = !this.isInLoginPage;
    this.loginBtnClicked.emit(this.isInLoginPage);
  }
}
