import { Component, EventEmitter, Output, OnInit } from '@angular/core';

interface Voice {
  name: string;
  code: string;
}

@Component({
  selector: 'app-voice-controls',
  templateUrl: './voice-controls.component.html',
  styleUrls: ['./voice-controls.component.scss'],
  standalone: false,
})
export class VoiceControlsComponent implements OnInit {
  @Output() voiceSelected = new EventEmitter<string>();

  voices: Voice[] = [
    { name: 'Vietnamese - Female', code: 'vi-VN-Female' },
    { name: 'Vietnamese - Male', code: 'vi-VN-Male' },
    { name: 'English (US) - Female', code: 'en-US-Female' },
    { name: 'English (US) - Male', code: 'en-US-Male' },
    { name: 'Japanese - Female', code: 'ja-JP-Female' },
    { name: 'Japanese - Male', code: 'ja-JP-Male' }
  ];

  selectedVoice: string = '';

  ngOnInit(): void {
    this.selectedVoice = this.voices[0].code;
    this.emitVoiceSelection();
  }

  selectVoice(voiceCode: string): void {
    if (this.selectedVoice !== voiceCode) {
      this.selectedVoice = voiceCode;
      this.emitVoiceSelection();
    }
  }

  onVoiceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectVoice(select.value);
  }

  private emitVoiceSelection(): void {
    this.voiceSelected.emit(this.selectedVoice);
  }
}