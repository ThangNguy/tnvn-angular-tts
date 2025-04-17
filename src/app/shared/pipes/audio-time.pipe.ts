import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'audioTime',
  standalone: false,
})
export class AudioTimePipe implements PipeTransform {
  transform(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}