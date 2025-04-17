import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { VoiceControlsComponent } from './voice-controls.component';

describe('VoiceControlsComponent', () => {
  let component: VoiceControlsComponent;
  let fixture: ComponentFixture<VoiceControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceControlsComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a list of voices', () => {
    expect(component.voices).toBeDefined();
    expect(component.voices.length).toBeGreaterThan(0);
  });

  it('should initialize with first voice selected', () => {
    expect(component.selectedVoice).toBe(component.voices[0].code);
  });

  it('should emit voiceSelected event on initialization', () => {
    // Arrange
    spyOn(component.voiceSelected, 'emit');
    
    // Act
    component.ngOnInit();
    
    // Assert
    expect(component.voiceSelected.emit).toHaveBeenCalledWith(component.voices[0].code);
  });

  it('should change selected voice when selectVoice is called with different voice', () => {
    // Arrange
    const initialVoice = component.selectedVoice;
    const newVoiceCode = 'en-US-Male';
    spyOn(component.voiceSelected, 'emit');
    
    // Act
    component.selectVoice(newVoiceCode);
    
    // Assert
    expect(component.selectedVoice).toBe(newVoiceCode);
    expect(component.selectedVoice).not.toBe(initialVoice);
    expect(component.voiceSelected.emit).toHaveBeenCalledWith(newVoiceCode);
  });

  it('should not emit event when selecting same voice', () => {
    // Arrange
    const currentVoice = component.selectedVoice;
    spyOn(component.voiceSelected, 'emit');
    
    // Act
    component.selectVoice(currentVoice);
    
    // Assert
    expect(component.voiceSelected.emit).not.toHaveBeenCalled();
  });

  it('should handle voice change event from select element', () => {
    // Arrange
    const newVoiceCode = 'ja-JP-Female';
    spyOn(component, 'selectVoice');
    const mockEvent = {
      target: {
        value: newVoiceCode
      }
    } as unknown as Event;
    
    // Act
    component.onVoiceChange(mockEvent);
    
    // Assert
    expect(component.selectVoice).toHaveBeenCalledWith(newVoiceCode);
  });

  it('should render all voices in select dropdown', () => {
    // Arrange
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Act
    const selectOptions = compiled.querySelectorAll('option');
    
    // Assert
    expect(selectOptions.length).toBe(component.voices.length);
    
    // Check if each voice option is rendered
    component.voices.forEach(voice => {
      const optionExists = Array.from(selectOptions).some(
        option => option.textContent?.includes(voice.name)
      );
      expect(optionExists).toBeTrue();
    });
  });
});