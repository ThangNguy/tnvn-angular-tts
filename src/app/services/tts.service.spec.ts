import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TtsService } from './tts.service';
import { SpeechConfig } from '../models/speech-config.model';
import { environment } from '../../environments/environment';

describe('TtsService', () => {
  let service: TtsService;
  let httpTestingController: HttpTestingController;
  const mockApiUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize';
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    // Override environment variables for testing
    environment.googleTtsApiUrl = mockApiUrl;
    environment.googleTtsApiKey = mockApiKey;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TtsService]
    });

    service = TestBed.inject(TtsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('synthesizeSpeech()', () => {
    it('should make POST request with correct parameters', () => {
      // Arrange
      const inputText = 'Hello, this is a test';
      const config = {
        languageCode: 'en-US',
        ssmlGender: 'FEMALE'
      } as SpeechConfig;
      const mockResponse = { audioContent: 'base64audio' };

      // Act
      service.synthesizeSpeech(inputText, config).subscribe(response => {
        // Assert
        expect(response).toEqual(mockResponse);
      });

      // Verify HTTP request
      const req = httpTestingController.expectOne(`${mockApiUrl}?key=${mockApiKey}`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        input: { text: inputText },
        voice: { 
          languageCode: config.languageCode, 
          ssmlGender: config.ssmlGender 
        },
        audioConfig: { 
          audioEncoding: 'MP3' 
        }
      });

      // Respond with mock data
      req.flush(mockResponse);
    });

    it('should handle HTTP client error', () => {
      // Arrange
      const inputText = 'Error test';
      const config = {
        languageCode: 'en-US',
        ssmlGender: 'MALE'
      } as SpeechConfig;
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      spyOn(console, 'error');

      // Act
      service.synthesizeSpeech(inputText, config).subscribe({
        next: () => fail('should have failed with 400 error'),
        error: (error) => {
          // Assert
          expect(error).toBeTruthy();
          expect(error.message).toContain('Error Code: 400');
          expect(console.error).toHaveBeenCalled();
        }
      });

      // Verify HTTP request
      const req = httpTestingController.expectOne(`${mockApiUrl}?key=${mockApiKey}`);
      expect(req.request.method).toEqual('POST');

      // Respond with mock error
      req.flush('Invalid request', mockErrorResponse);
    });

    it('should handle client-side error', () => {
      // Arrange
      const inputText = 'Error test';
      const config = {
        languageCode: 'en-US',
        ssmlGender: 'MALE'
      } as SpeechConfig;
      spyOn(console, 'error');

      // Act
      service.synthesizeSpeech(inputText, config).subscribe({
        next: () => fail('should have failed with network error'),
        error: (error) => {
          // Assert
          expect(error).toBeTruthy();
          expect(console.error).toHaveBeenCalled();
        }
      });

      // Verify HTTP request
      const req = httpTestingController.expectOne(`${mockApiUrl}?key=${mockApiKey}`);
      
      // Create an ErrorEvent
      const mockError = new ErrorEvent('Network error', {
        message: 'CORS error',
      });

      // Respond with mock error
      req.error(mockError);
    });
  });
});