import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-voice-controls',
  templateUrl: './voice-controls.component.html',
  styleUrls: ['./voice-controls.component.scss'],
  standalone: false,
})
export class VoiceControlsComponent {
  @Output() voiceSelected = new EventEmitter<string>();
  @Output() playbackControl = new EventEmitter<string>();

  voices = [
    { name: 'English (US) - Female', code: 'en-US-Female' },
    { name: 'English (US) - Male', code: 'en-US-Male' },
    { name: 'Spanish (US) - Female', code: 'es-US-Female' },
    { name: 'Spanish (US) - Male', code: 'es-US-Male' }
  ];

  selectedVoice: string = this.voices[0].code;

  selectVoice(voiceCode: string) {
    this.selectedVoice = voiceCode;
    this.voiceSelected.emit(this.selectedVoice);
  }

  play() {
    this.playbackControl.emit('play');
  }

  pause() {
    this.playbackControl.emit('pause');
  }

  stop() {
    this.playbackControl.emit('stop');
  }

  onVoiceChange() {
    
  }
}