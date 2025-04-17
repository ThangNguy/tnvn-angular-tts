import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpeechConfig } from '../models/speech-config.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  private apiUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize';
  private apiKey = environment.googleTtsApiKey;

  constructor(private http: HttpClient) {}

  synthesizeSpeech(text: string, config: SpeechConfig): Observable<any> {
    const body = {
      input: { text: text },
      voice: { languageCode: config.languageCode, ssmlGender: config.ssmlGender },
      audioConfig: { audioEncoding: 'MP3' },
    };

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body);
  }
}