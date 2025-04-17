import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  standalone: false,
})
export class TextInputComponent {
  inputText: string = '';
  @Output() textSubmitted: EventEmitter<string> = new EventEmitter<string>();

  onSubmit() {
    if (this.inputText.trim()) {
      this.textSubmitted.emit(this.inputText);
      this.inputText = '';
    }
  }
}