import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty inputText', () => {
    expect(component.textForm).toBeDefined();
    expect(component.textForm.get('inputText')).toBeDefined();
    expect(component.textForm.get('inputText')?.value).toBe('');
  });

  it('should mark form as invalid when inputText is empty', () => {
    // Arrange
    const inputControl = component.textForm.get('inputText');
    
    // Act
    inputControl?.setValue('');
    
    // Assert
    expect(inputControl?.valid).toBeFalse();
    expect(component.textForm.valid).toBeFalse();
  });

  it('should mark form as valid when inputText has value', () => {
    // Arrange
    const inputControl = component.textForm.get('inputText');
    
    // Act
    inputControl?.setValue('Test text');
    
    // Assert
    expect(inputControl?.valid).toBeTrue();
    expect(component.textForm.valid).toBeTrue();
  });

  it('should emit textSubmitted event when form is submitted with valid text', () => {
    // Arrange
    const testText = 'Test speech text';
    const inputControl = component.textForm.get('inputText');
    spyOn(component.textSubmitted, 'emit');
    
    // Act
    inputControl?.setValue(testText);
    component.onSubmit();
    
    // Assert
    expect(component.textSubmitted.emit).toHaveBeenCalledWith(testText);
  });

  it('should reset form after successful submission', () => {
    // Arrange
    const testText = 'Test speech text';
    const inputControl = component.textForm.get('inputText');
    inputControl?.setValue(testText);
    
    // Act
    component.onSubmit();
    
    // Assert
    expect(inputControl?.value).toBeFalsy();
  });

  it('should not emit event when form is invalid', () => {
    // Arrange
    spyOn(component.textSubmitted, 'emit');
    component.textForm.get('inputText')?.setValue('');
    
    // Act
    component.onSubmit();
    
    // Assert
    expect(component.textSubmitted.emit).not.toHaveBeenCalled();
  });

  it('should not emit event when text contains only whitespace', () => {
    // Arrange
    spyOn(component.textSubmitted, 'emit');
    component.textForm.get('inputText')?.setValue('   ');
    
    // Act
    component.onSubmit();
    
    // Assert
    expect(component.textSubmitted.emit).not.toHaveBeenCalled();
  });
});