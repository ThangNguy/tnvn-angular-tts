import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  standalone: false,
})
export class AudioPlayerComponent implements OnChanges, OnDestroy {
  @Input() audioSrc: string | null = null;
  audioDuration: number = 0;
  isPlaying: boolean = false;
  private _audio: HTMLAudioElement | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audioSrc'] && changes['audioSrc'].currentValue) {
      this.cleanupAudio();
      this._audio = new Audio(this.audioSrc as string);
      this._audio.addEventListener('loadedmetadata', () => {
        if (this._audio) {
          this.audioDuration = this._audio.duration;
        }
      });
    }
  }

  playAudio(): void {
    if (this._audio) {
      this._audio.play();
      this.isPlaying = true;
    }
  }

  pauseAudio(): void {
    if (this._audio) {
      this._audio.pause();
      this.isPlaying = false;
    }
  }

  stopAudio(): void {
    if (this._audio) {
      this._audio.pause();
      this._audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
  
  /**
   * Tải xuống file âm thanh hiện tại
   */
  downloadAudio(): void {
    if (this.audioSrc) {
      // Tạo thời gian để thêm vào tên file
      const date = new Date();
      const timestamp = 
        date.getFullYear() + 
        ('0' + (date.getMonth() + 1)).slice(-2) + 
        ('0' + date.getDate()).slice(-2) + 
        '_' +
        ('0' + date.getHours()).slice(-2) + 
        ('0' + date.getMinutes()).slice(-2);
      
      // Tạo phần tử a để tải xuống
      const link = document.createElement('a');
      link.href = this.audioSrc;
      link.download = `tts_audio_${timestamp}.mp3`;
      
      // Thêm vào DOM, click và xóa
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private cleanupAudio(): void {
    if (this._audio) {
      this._audio.pause();
      this._audio = null;
    }
  }

  ngOnDestroy(): void {
    this.cleanupAudio();
  }
}