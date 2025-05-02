import { Component, OnInit } from '@angular/core';
import { TtsService } from './services/tts.service';
import { HistoryService } from './services/history.service';
import { SpeechConfig, DEFAULT_SPEECH_CONFIG } from './models/speech-config.model';
import { createSpeechHistory } from './models/speech-history.model';

// Định nghĩa interface VoiceSettings để nhận dữ liệu từ component con
interface VoiceSettings {
  voice: string;
  rate: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'Text to Speech App';
  
  // Trạng thái cho TTS
  currentText: string = '';
  isProcessing: boolean = false;
  audioSource: string | null = null;
  
  // Cấu hình cho TTS
  speechConfig: SpeechConfig = { ...DEFAULT_SPEECH_CONFIG };
  
  constructor(
    private _ttsService: TtsService,
    private _historyService: HistoryService
  ) {}
  
  ngOnInit(): void {
    // Khởi tạo với cấu hình mặc định
  }
  
  /**
   * Xử lý khi text được nhập từ component con
   */
  onTextSubmitted(text: string): void {
    this.currentText = text;
    this.synthesizeSpeech();
  }
  
  /**
   * Xử lý khi voice được chọn từ component con
   * Cập nhật để nhận object VoiceSettings thay vì chỉ nhận voiceCode
   */
  onVoiceSelected(settings: VoiceSettings): void {
    const voiceCode = settings.voice;
    const rate = settings.rate;
    
    // Phân tích voiceCode để lấy languageCode và ssmlGender
    const parts = voiceCode.split('-');
    
    // Format dự kiến là: 'vi-VN-Female' hoặc 'en-US-Male'
    if (parts.length >= 3) {
      // Lấy phần cuối cùng là gender
      const gender = parts[parts.length - 1];
      // Ghép các phần còn lại để tạo languageCode đầy đủ (ví dụ: vi-VN)
      const languageCode = parts.slice(0, parts.length - 1).join('-');
      
      this.speechConfig = {
        ...this.speechConfig,
        languageCode,
        ssmlGender: gender.toUpperCase() as 'MALE' | 'FEMALE' | 'NEUTRAL',
        speakingRate: rate // Thêm tốc độ đọc vào cấu hình
      };
      
      console.log('Voice settings updated:', { 
        languageCode, 
        gender: gender.toUpperCase(),
        speakingRate: rate
      });
    } else {
      console.error('Invalid voice code format:', voiceCode);
    }
  }
  
  /**
   * Gọi TtsService để chuyển đổi văn bản thành giọng nói
   */
  private synthesizeSpeech(): void {
    if (!this.currentText || this.isProcessing) {
      return;
    }
    
    this.isProcessing = true;
    
    this._ttsService.synthesizeSpeech(this.currentText, this.speechConfig)
      .subscribe({
        next: (response) => {
          // Chuyển đổi base64 thành URL âm thanh
          const audioData = response.audioContent;
          this.audioSource = `data:audio/mp3;base64,${audioData}`;
          
          // Thêm vào lịch sử
          const historyEntry = createSpeechHistory(
            this.currentText,
            this.speechConfig.languageCode,
            this.speechConfig.ssmlGender,
            this.audioSource
          );
          this._historyService.addToHistory(historyEntry);
          
          this.isProcessing = false;
        },
        error: (error) => {
          console.error('Lỗi khi chuyển đổi văn bản thành giọng nói:', error);
          this.isProcessing = false;
        }
      });
  }
}