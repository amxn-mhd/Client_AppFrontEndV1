import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,CommonModule,RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isExpanded = signal(true);
  @Output() expandedChange = new EventEmitter<boolean>();

  toggleSidebar() {
    const newState = !this.isExpanded();
    this.isExpanded.set(newState);
    this.expandedChange.emit(newState);
  }
  menuItems = [
    { icon: '🏠', label: 'Dashboard', route: '/dashboard' },
    { icon: '📋', label: 'Register', route: '/register' },
    { icon: '🪪', label: 'Patient', route: '/patient/search'},
    { icon: '💉', label: 'Medicine', route: '/medicine'}
  ];
  
}
