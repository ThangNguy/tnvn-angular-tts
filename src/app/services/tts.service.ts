import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SpeechConfig } from '../models/speech-config.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  private _apiUrl = environment.googleTtsApiUrl || 'https://texttospeech.googleapis.com/v1/text:synthesize';
  private _apiKey = environment.googleTtsApiKey;

  constructor(private _http: HttpClient) {}

  synthesizeSpeech(text: string, config: SpeechConfig): Observable<any> {
    const body = {
      input: { text },
      voice: { 
        languageCode: config.languageCode, 
        ssmlGender: config.ssmlGender 
      },
      audioConfig: { 
        audioEncoding: 'MP3',
        // Thêm tốc độ đọc vào cấu hình audio
        speakingRate: config.speakingRate || 1.0
      },
    };

    return this._http.post(`${this._apiUrl}?key=${this._apiKey}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}