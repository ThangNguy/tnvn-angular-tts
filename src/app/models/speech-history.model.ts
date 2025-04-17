/**
 * Đại diện cho một bản ghi lịch sử chuyển đổi văn bản thành giọng nói
 */
export interface SpeechHistory {
  /** ID duy nhất của bản ghi */
  id: number;
  
  /** Nội dung văn bản được chuyển đổi */
  text: string;
  
  /** Mã ngôn ngữ được sử dụng, ví dụ 'vi-VN', 'en-US' */
  languageCode: string;
  
  /** Giới tính giọng đọc */
  ssmlGender: 'MALE' | 'FEMALE' | 'NEUTRAL';
  
  /** URL của tệp âm thanh đã tạo */
  audioUrl: string;
  
  /** Thời gian tạo bản ghi */
  timestamp: Date;
}

/**
 * Factory method để tạo mới SpeechHistory
 */
export function createSpeechHistory(
  text: string,
  languageCode: string,
  ssmlGender: 'MALE' | 'FEMALE' | 'NEUTRAL',
  audioUrl: string
): SpeechHistory {
  return {
    id: Date.now(),
    text,
    languageCode,
    ssmlGender,
    audioUrl,
    timestamp: new Date()
  };
}