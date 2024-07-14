import { Component, HostListener } from '@angular/core';
import { InactivityService } from './services/inactivity/inactivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private inactivityService: InactivityService) {}

  @HostListener('window:mousemove')
  @HostListener('window:keypress')
  resetInactivityTimer() {
    this.inactivityService.startInactivityTimer();
  }
}
