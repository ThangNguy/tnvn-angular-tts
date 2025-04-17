/**
 * Cấu hình cho tính năng Text-to-Speech
 */
export interface SpeechConfig {
  /** Mã ngôn ngữ, ví dụ 'vi-VN', 'en-US', 'ja-JP' */
  languageCode: string;
  
  /** Giới tính giọng đọc */
  ssmlGender: 'MALE' | 'FEMALE' | 'NEUTRAL';
  
  /** Tên giọng đọc cụ thể, tùy chọn */
  voiceName?: string;
  
  /** Định dạng âm thanh đầu ra */
  audioEncoding: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
}

/**
 * Cấu hình mặc định cho TTS
 */
export const DEFAULT_SPEECH_CONFIG: SpeechConfig = {
  languageCode: 'vi-VN',
  ssmlGender: 'FEMALE',
  audioEncoding: 'MP3'
};