export interface SpeechConfig {
  languageCode: string;
  ssmlGender: 'MALE' | 'FEMALE' | 'NEUTRAL';
  voiceName?: string;
  audioEncoding: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
}