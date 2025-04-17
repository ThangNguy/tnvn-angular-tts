import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  standalone: false,
})
export class AudioPlayerComponent {
  @Input() audioSrc: string | null = null;
  audioDuration: number = 0;
  isPlaying: boolean = false;
  audio: HTMLAudioElement | null = null;

  ngOnInit() {
    if (this.audioSrc) {
      this.audio = new Audio(this.audioSrc);
    }
  }

  playAudio() {
    if (this.audio) {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  pauseAudio() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}