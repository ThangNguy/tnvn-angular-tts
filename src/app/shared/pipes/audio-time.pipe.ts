import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe để chuyển đổi thời gian âm thanh từ giây sang định dạng mm:ss
 * @example {{ 125 | audioTime }} -> '2:05'
 */
@Pipe({
  name: 'audioTime',
  standalone: false,
})
export class AudioTimePipe implements PipeTransform {
  /**
   * Chuyển đổi thời gian từ giây sang định dạng mm:ss
   * @param duration - Thời lượng tính bằng giây
   * @returns Chuỗi theo định dạng mm:ss
   */
  transform(duration: number | null | undefined): string {
    if (duration == null || isNaN(duration)) {
      return '0:00';
    }
    
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}