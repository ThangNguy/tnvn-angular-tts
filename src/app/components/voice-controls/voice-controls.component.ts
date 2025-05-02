import { Component, EventEmitter, Output, OnInit } from '@angular/core';

interface Voice {
  name: string;
  code: string;
}

// Thêm interface mới để chứa cả thông tin giọng đọc và tốc độ
interface VoiceSettings {
  voice: string;
  rate: number;
}

@Component({
  selector: 'app-voice-controls',
  templateUrl: './voice-controls.component.html',
  styleUrls: ['./voice-controls.component.scss'],
  standalone: false,
})
export class VoiceControlsComponent implements OnInit {
  // Cập nhật kiểu dữ liệu output
  @Output() voiceSelected = new EventEmitter<VoiceSettings>();

  voices: Voice[] = [
    { name: 'English (US) - Male', code: 'en-US-Male' },
    { name: 'English (US) - Female', code: 'en-US-Female' },
    { name: 'Vietnamese - Female', code: 'vi-VN-Female' },
    { name: 'Vietnamese - Male', code: 'vi-VN-Male' },
    { name: 'Japanese - Female', code: 'ja-JP-Female' },
    { name: 'Japanese - Male', code: 'ja-JP-Male' }
  ];

  selectedVoice: string = '';
  
  // Thêm thuộc tính cho tốc độ đọc
  speechRate: number = 1.0; // Tốc độ mặc định là 1.0
  
  // Thêm phạm vi tốc độ cho slider
  minRate: number = 0.5;  // Tốc độ chậm nhất
  maxRate: number = 2.0;  // Tốc độ nhanh nhất
  stepRate: number = 0.1; // Bước nhảy của tốc độ

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

  // Thêm phương thức xử lý thay đổi tốc độ
  onRateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.speechRate = parseFloat(input.value);
    this.emitVoiceSelection();
  }

  private emitVoiceSelection(): void {
    // Cập nhật để truyền cả thông tin giọng nói và tốc độ
    const settings: VoiceSettings = {
      voice: this.selectedVoice,
      rate: this.speechRate
    };
    this.voiceSelected.emit(settings);
  }
}