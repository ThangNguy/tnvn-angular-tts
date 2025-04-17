import { Injectable } from '@angular/core';
import { SpeechHistory } from '../models/speech-history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: SpeechHistory[] = [];

  addToHistory(entry: SpeechHistory): void {
    this.history.push(entry);
  }

  getHistory(): SpeechHistory[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}