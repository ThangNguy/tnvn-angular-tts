import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  title: string = 'TNVN Text-to-Speech';

  constructor() {}

  /**
   * Xử lý sự kiện khi người dùng nhấp vào liên kết Hướng dẫn
   */
  onHelpClick(event: Event): void {
    event.preventDefault();
    // Hiển thị modal hướng dẫn hoặc chuyển hướng đến trang hướng dẫn
    alert('Chức năng hướng dẫn sử dụng sẽ được triển khai trong phiên bản tới!');
  }
}