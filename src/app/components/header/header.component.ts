import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  title: string = 'Text-to-Speech Application';

  constructor() {}

  // Method to handle user interactions can be added here
  onHelpClick() {
    // Logic for help button click
  }
}