import { AudioTimePipe } from './audio-time.pipe';

describe('AudioTimePipe', () => {
  let pipe: AudioTimePipe;

  beforeEach(() => {
    pipe = new AudioTimePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "0:00" for null or undefined values', () => {
    expect(pipe.transform(null)).toBe('0:00');
    expect(pipe.transform(undefined)).toBe('0:00');
  });

  it('should return "0:00" for NaN value', () => {
    expect(pipe.transform(NaN)).toBe('0:00');
  });

  it('should format seconds correctly', () => {
    expect(pipe.transform(0)).toBe('0:00');
    expect(pipe.transform(1)).toBe('0:01');
    expect(pipe.transform(30)).toBe('0:30');
  });

  it('should format minutes and seconds correctly', () => {
    expect(pipe.transform(60)).toBe('1:00');
    expect(pipe.transform(65)).toBe('1:05');
    expect(pipe.transform(119)).toBe('1:59');
  });

  it('should format multiple minutes correctly', () => {
    expect(pipe.transform(120)).toBe('2:00');
    expect(pipe.transform(185)).toBe('3:05');
    expect(pipe.transform(3600)).toBe('60:00');
    expect(pipe.transform(3661)).toBe('61:01');
  });

  it('should handle decimal values correctly', () => {
    expect(pipe.transform(60.5)).toBe('1:00');
    expect(pipe.transform(61.9)).toBe('1:01');
  });
});