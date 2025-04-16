import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppFrontEnd';

  isSidebarExpanded = true;

  onSidebarToggle(isExpanded: boolean) {
    this.isSidebarExpanded = isExpanded;
  }
}
