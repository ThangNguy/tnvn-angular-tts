import { Injectable, signal } from '@angular/core';
import { SpeechHistory } from '../models/speech-history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private _history = signal<SpeechHistory[]>([]);

  addToHistory(entry: SpeechHistory): void {
    this._history.update(history => [...history, entry]);
  }

  getHistory() {
    return this._history.asReadonly();
  }

  clearHistory(): void {
    this._history.set([]);
  }
}