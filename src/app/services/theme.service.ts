import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(environment.darkModeDefault);
  public isDarkMode = this.darkMode.asObservable();

  constructor() {
    this.loadTheme();
  }

  /**
   * Chuyển đổi giữa chế độ sáng và tối
   */
  toggleDarkMode(): void {
    this.setDarkMode(!this.darkMode.value);
  }

  /**
   * Thiết lập chế độ sáng/tối cụ thể
   */
  setDarkMode(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Lưu trạng thái vào localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    this.darkMode.next(isDark);
  }

  /**
   * Tải trạng thái theme từ localStorage khi khởi động
   */
  private loadTheme(): void {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Sử dụng theme đã lưu hoặc theo cài đặt hệ thống hoặc cấu hình môi trường
    const isDark = savedTheme !== null ? 
      JSON.parse(savedTheme) : 
      (prefersDark || environment.darkModeDefault);
      
    this.setDarkMode(isDark);
  }
}