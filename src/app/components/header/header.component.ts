import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  title: string = 'TNVN Text-to-Speech';
  isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Theo dõi trạng thái theme hiện tại
    this.themeService.isDarkMode.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  /**
   * Chuyển đổi giữa chế độ sáng và tối
   */
  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  /**
   * Xử lý sự kiện khi người dùng nhấp vào liên kết Hướng dẫn
   */
  onHelpClick(event: Event): void {
    event.preventDefault();
    // Hiển thị modal hướng dẫn hoặc chuyển hướng đến trang hướng dẫn
    alert('Chức năng hướng dẫn sử dụng sẽ được triển khai trong phiên bản tới!');
  }
}