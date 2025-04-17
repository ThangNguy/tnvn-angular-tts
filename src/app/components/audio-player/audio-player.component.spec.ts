import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioPlayerComponent } from './audio-player.component';
import { AudioTimePipe } from '../../shared/pipes/audio-time.pipe';
import { SimpleChange } from '@angular/core';

describe('AudioPlayerComponent', () => {
  let component: AudioPlayerComponent;
  let fixture: ComponentFixture<AudioPlayerComponent>;
  let mockAudio: jasmine.SpyObj<HTMLAudioElement>;

  // Helper function to trigger ngOnChanges with audioSrc
  function triggerAudioSrcChange(value: string | null) {
    component.audioSrc = value;
    component.ngOnChanges({
      audioSrc: new SimpleChange(null, component.audioSrc, true)
    });
  }

  beforeEach(async () => {
    // Create audio spy
    mockAudio = jasmine.createSpyObj('HTMLAudioElement', 
      ['play', 'pause', 'addEventListener'], 
      { currentTime: 0, duration: 120 }
    );
    
    spyOn(window, 'Audio').and.returnValue(mockAudio);

    await TestBed.configureTestingModule({
      declarations: [AudioPlayerComponent, AudioTimePipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with null audioSrc and zero duration', () => {
    expect(component.audioSrc).toBeNull();
    expect(component.audioDuration).toBe(0);
    expect(component.isPlaying).toBeFalse();
  });

  it('should create new Audio object when audioSrc changes', () => {
    // Arrange
    const testSrc = 'data:audio/mp3;base64,testAudioData';
    
    // Act
    triggerAudioSrcChange(testSrc);
    
    // Assert
    expect(window.Audio).toHaveBeenCalledWith(testSrc);
    expect(mockAudio.addEventListener).toHaveBeenCalledWith(
      'loadedmetadata',
      jasmine.any(Function)
    );
  });

  it('should clean up previous audio before creating new one', () => {
    // Arrange
    const initialSrc = 'data:audio/mp3;base64,initial';
    const newSrc = 'data:audio/mp3;base64,new';
    triggerAudioSrcChange(initialSrc);
    spyOn<any>(component, 'cleanupAudio').and.callThrough();
    
    // Act
    triggerAudioSrcChange(newSrc);
    
    // Assert
    expect(component['cleanupAudio']).toHaveBeenCalled();
    expect(window.Audio).toHaveBeenCalledWith(newSrc);
  });

  it('should update audioDuration when metadata is loaded', () => {
    // Arrange
    const testSrc = 'data:audio/mp3;base64,testAudioData';
    const expectedDuration = 180;
    
    // Act
    triggerAudioSrcChange(testSrc);
    
    // Simulate the metadata loaded event
    const metadataCallback = mockAudio.addEventListener.calls.argsFor(0)[1] as Function;
    Object.defineProperty(mockAudio, 'duration', {value: expectedDuration});
    metadataCallback();
    
    // Assert
    expect(component.audioDuration).toBe(expectedDuration);
  });

  it('should play audio when playAudio is called', () => {
    // Arrange
    triggerAudioSrcChange('data:audio/mp3;base64,testAudio');
    
    // Act
    component.playAudio();
    
    // Assert
    expect(mockAudio.play).toHaveBeenCalled();
    expect(component.isPlaying).toBeTrue();
  });

  it('should pause audio when pauseAudio is called', () => {
    // Arrange
    triggerAudioSrcChange('data:audio/mp3;base64,testAudio');
    component.playAudio();
    
    // Act
    component.pauseAudio();
    
    // Assert
    expect(mockAudio.pause).toHaveBeenCalled();
    expect(component.isPlaying).toBeFalse();
  });

  it('should stop audio when stopAudio is called', () => {
    // Arrange
    triggerAudioSrcChange('data:audio/mp3;base64,testAudio');
    component.playAudio();
    
    // Act
    component.stopAudio();
    
    // Assert
    expect(mockAudio.pause).toHaveBeenCalled();
    expect(mockAudio.currentTime).toBe(0);
    expect(component.isPlaying).toBeFalse();
  });

  it('should clean up audio in ngOnDestroy', () => {
    // Arrange
    triggerAudioSrcChange('data:audio/mp3;base64,testAudio');
    spyOn<any>(component, 'cleanupAudio');
    
    // Act
    component.ngOnDestroy();
    
    // Assert
    expect(component['cleanupAudio']).toHaveBeenCalled();
  });

  it('should download audio when downloadAudio is called', () => {
    // Arrange
    const testSrc = 'data:audio/mp3;base64,testAudio';
    triggerAudioSrcChange(testSrc);
    
    // Mock document.createElement
    const mockLink = jasmine.createSpyObj('HTMLAnchorElement', ['click']);
    spyOn(document, 'createElement').and.returnValue(mockLink);
    spyOn(document.body, 'appendChild');
    spyOn(document.body, 'removeChild');
    
    // Act
    component.downloadAudio();
    
    // Assert
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe(testSrc);
    expect(mockLink.download).toContain('tts_audio_');
    expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
    expect(mockLink.click).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
  });

  it('should not attempt to download when audioSrc is null', () => {
    // Arrange
    component.audioSrc = null;
    spyOn(document, 'createElement');
    
    // Act
    component.downloadAudio();
    
    // Assert
    expect(document.createElement).not.toHaveBeenCalled();
  });
});