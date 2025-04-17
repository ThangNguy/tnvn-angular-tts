import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  standalone: false,
})
export class TextInputComponent implements OnInit {
  @Output() textSubmitted: EventEmitter<string> = new EventEmitter<string>();
  textForm!: FormGroup;
  
  constructor(private _fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.textForm = this._fb.group({
      inputText: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit(): void {
    if (this.textForm.valid && this.textForm.value.inputText.trim()) {
      this.textSubmitted.emit(this.textForm.value.inputText);
      this.textForm.reset();
    }
  }
}