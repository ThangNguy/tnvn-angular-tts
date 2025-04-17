import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';
import { SpeechHistory } from '../models/speech-history.model';

describe('HistoryService', () => {
  let service: HistoryService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryService]
    });
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty history', () => {
    // Assert
    expect(service.getHistory()()).toEqual([]);
  });

  it('should add new entry to history', () => {
    // Arrange
    const mockEntry: SpeechHistory = {
      id: 123,
      text: 'Test speech',
      timestamp: new Date(),
      languageCode: 'vi-VN',
      ssmlGender: 'FEMALE',
      audioUrl: 'data:audio/mp3;base64,testAudio'
    };
    
    // Act
    service.addToHistory(mockEntry);
    
    // Assert
    const history = service.getHistory()();
    expect(history.length).toBe(1);
    expect(history[0]).toEqual(mockEntry);
  });

  it('should add multiple entries to history in correct order', () => {
    // Arrange
    const mockEntry1: SpeechHistory = {
      id: 123,
      text: 'First speech',
      timestamp: new Date(),
      languageCode: 'vi-VN',
      ssmlGender: 'FEMALE',
      audioUrl: 'data:audio/mp3;base64,audio1'
    };
    
    const mockEntry2: SpeechHistory = {
      id: 456,
      text: 'Second speech',
      timestamp: new Date(),
      languageCode: 'en-US',
      ssmlGender: 'MALE',
      audioUrl: 'data:audio/mp3;base64,audio2'
    };
    
    // Act
    service.addToHistory(mockEntry1);
    service.addToHistory(mockEntry2);
    
    // Assert
    const history = service.getHistory()();
    expect(history.length).toBe(2);
    expect(history[0]).toEqual(mockEntry1);
    expect(history[1]).toEqual(mockEntry2);
  });

  it('should clear history', () => {
    // Arrange
    const mockEntry: SpeechHistory = {
      id: 123,
      text: 'Test speech',
      timestamp: new Date(),
      languageCode: 'vi-VN',
      ssmlGender: 'FEMALE',
      audioUrl: 'data:audio/mp3;base64,testAudio'
    };
    
    service.addToHistory(mockEntry);
    expect(service.getHistory()().length).toBe(1); // Verify entry was added
    
    // Act
    service.clearHistory();
    
    // Assert
    expect(service.getHistory()().length).toBe(0);
    expect(service.getHistory()()).toEqual([]);
  });

  it('should not mutate original history array when adding new entries', () => {
    // Arrange
    const mockEntry1: SpeechHistory = {
      id: 123,
      text: 'First speech',
      timestamp: new Date(),
      languageCode: 'vi-VN',
      ssmlGender: 'FEMALE',
      audioUrl: 'data:audio/mp3;base64,audio1'
    };
    
    const mockEntry2: SpeechHistory = {
      id: 456,
      text: 'Second speech',
      timestamp: new Date(),
      languageCode: 'en-US',
      ssmlGender: 'MALE',
      audioUrl: 'data:audio/mp3;base64,audio2'
    };
    
    // Act
    service.addToHistory(mockEntry1);
    const historyAfterFirstAdd = service.getHistory()();
    
    service.addToHistory(mockEntry2);
    const historyAfterSecondAdd = service.getHistory()();
    
    // Assert
    expect(historyAfterFirstAdd).not.toBe(historyAfterSecondAdd); // Should be different array references
    expect(historyAfterFirstAdd.length).toBe(1);
    expect(historyAfterSecondAdd.length).toBe(2);
  });
});