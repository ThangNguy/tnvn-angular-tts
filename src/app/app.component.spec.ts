import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TtsService } from './services/tts.service';
import { HistoryService } from './services/history.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let ttsServiceSpy: jasmine.SpyObj<TtsService>;
  let historyServiceSpy: jasmine.SpyObj<HistoryService>;

  beforeEach(async () => {
    const ttsServiceMock = jasmine.createSpyObj('TtsService', ['synthesizeSpeech']);
    const historyServiceMock = jasmine.createSpyObj('HistoryService', ['addToHistory']);
    
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: TtsService, useValue: ttsServiceMock },
        { provide: HistoryService, useValue: historyServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Cho phép bỏ qua các thành phần con chưa được khai báo
    }).compileComponents();

    ttsServiceSpy = TestBed.inject(TtsService) as jasmine.SpyObj<TtsService>;
    historyServiceSpy = TestBed.inject(HistoryService) as jasmine.SpyObj<HistoryService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBeTruthy();
    expect(component.title).toContain('Text to Speech');
  });

  it('should initialize with default speech config', () => {
    expect(component.speechConfig).toBeDefined();
    expect(component.speechConfig.languageCode).toBeDefined();
    expect(component.speechConfig.ssmlGender).toBeDefined();
  });

  it('should process text from onTextSubmitted', () => {
    // Arrange
    const testText = 'Test speech text';
    ttsServiceSpy.synthesizeSpeech.and.returnValue(of({ audioContent: 'base64audio' }));
    
    // Act
    component.onTextSubmitted(testText);
    
    // Assert
    expect(component['currentText']).toEqual(testText);
    expect(ttsServiceSpy.synthesizeSpeech).toHaveBeenCalled();
  });

  it('should correctly parse voice code in onVoiceSelected', () => {
    // Arrange
    const voiceCode = 'vi-VN-Female';
    
    // Act
    component.onVoiceSelected(voiceCode);
    
    // Assert
    expect(component.speechConfig.languageCode).toEqual('vi-VN');
    expect(component.speechConfig.ssmlGender).toEqual('FEMALE');
  });

  it('should handle complex voice code formats correctly', () => {
    // Arrange
    const complexVoiceCode = 'en-US-Standard-Female';
    
    // Act
    component.onVoiceSelected(complexVoiceCode);
    
    // Assert
    expect(component.speechConfig.languageCode).toEqual('en-US-Standard');
    expect(component.speechConfig.ssmlGender).toEqual('FEMALE');
  });

  it('should handle errors when synthesizing speech', fakeAsync(() => {
    // Arrange
    const testText = 'Test speech text';
    const errorMessage = 'API Error';
    spyOn(console, 'error');
    ttsServiceSpy.synthesizeSpeech.and.returnValue(throwError(() => new Error(errorMessage)));
    
    // Act
    component.onTextSubmitted(testText);
    tick();
    
    // Assert
    expect(console.error).toHaveBeenCalled();
    expect(component['isProcessing']).toBeFalse();
  }));

  it('should add to history when speech is synthesized successfully', fakeAsync(() => {
    // Arrange
    const testText = 'Test speech text';
    ttsServiceSpy.synthesizeSpeech.and.returnValue(of({ audioContent: 'base64audio' }));
    
    // Act
    component.onTextSubmitted(testText);
    tick();
    
    // Assert
    expect(historyServiceSpy.addToHistory).toHaveBeenCalled();
    expect(component.audioSource).toContain('data:audio/mp3;base64');
    expect(component['isProcessing']).toBeFalse();
  }));
});