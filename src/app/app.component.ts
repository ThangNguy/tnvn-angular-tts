import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'Text to Speech App';
  text = '';
  isSpeaking = false;
  voiceOptions: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | null = null;
  pitch = 1;
  rate = 1;
  volume = 1;

  ngOnInit() {
    if ('speechSynthesis' in window) {
      this.loadVoices();
      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  loadVoices() {
    this.voiceOptions = window.speechSynthesis.getVoices();
    if (this.voiceOptions.length > 0) {
      this.selectedVoice = this.voiceOptions[0];
    }
  }

  speak() {
    if (!this.text) return;
    
    this.isSpeaking = true;
    const utterance = new SpeechSynthesisUtterance(this.text);
    
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    
    utterance.pitch = this.pitch;
    utterance.rate = this.rate;
    utterance.volume = this.volume;
    
    utterance.onend = () => {
      this.isSpeaking = false;
    };
    
    window.speechSynthesis.speak(utterance);
  }

  stop() {
    window.speechSynthesis.cancel();
    this.isSpeaking = false;
  }
}