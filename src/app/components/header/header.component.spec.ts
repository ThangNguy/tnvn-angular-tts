import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBeTruthy();
    expect(component.title).toBe('TNVN Text-to-Speech');
  });

  it('should render title in header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(component.title);
  });

  it('should show subtitle text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.subtitle')?.textContent).toBeTruthy();
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('nav ul li a');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should call onHelpClick when help link is clicked', () => {
    // Arrange
    spyOn(component, 'onHelpClick');
    const compiled = fixture.nativeElement as HTMLElement;
    const helpLink = Array.from(compiled.querySelectorAll('nav ul li a')).find(
      a => a.textContent?.includes('Hướng dẫn')
    );
    
    // Act
    helpLink?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    // Assert
    expect(component.onHelpClick).toHaveBeenCalled();
  });

  it('should show alert when onHelpClick is called', () => {
    // Arrange
    spyOn(window, 'alert');
    
    // Act
    component.onHelpClick(new Event('click'));
    
    // Assert
    expect(window.alert).toHaveBeenCalledWith(
      jasmine.stringContaining('Chức năng hướng dẫn')
    );
  });
});