import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit } from '@angular/core';

/**
 * Directive để làm nổi bật phần tử khi di chuột qua
 */
@Directive({
  selector: '[appHighlight]',
  standalone: false,
})
export class HighlightDirective implements OnInit {
  @Input() highlightColor: string = '#ffff99'; // Màu vàng nhạt mặc định
  @Input() transitionTime: string = '0.3s';
  
  private defaultColor: string = '';
  
  constructor(
    private _el: ElementRef, 
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Thiết lập transition cho hiệu ứng mượt mà
    this._renderer.setStyle(
      this._el.nativeElement, 
      'transition', 
      `background-color ${this.transitionTime} ease`
    );
    
    // Lưu màu nền mặc định
    this.defaultColor = this._el.nativeElement.style.backgroundColor || 'transparent';
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight(this.defaultColor);
  }

  private highlight(color: string): void {
    this._renderer.setStyle(this._el.nativeElement, 'backgroundColor', color);
  }
}