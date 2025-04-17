export interface SpeechHistory {
  id: number;
  text: string;
  languageCode: string;
  ssmlGender: string;
  audioUrl: string;
  timestamp: Date;
}