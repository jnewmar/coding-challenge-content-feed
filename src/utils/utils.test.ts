import { createImageElement, getImageFormat } from '../utils/utils';

describe('createImageElement', () => {
  it('should return a new Image element if no argument is provided', () => {
    const result = createImageElement();

    expect(result instanceof Image).toBe(true);
  });

  it('should return the provided image element if an image is provided', () => {
    const img = new Image();

    const result = createImageElement(img);

    expect(result).toBe(img);
  });
});

describe('getImageFormat function', () => {
  jest.mock('../constants/config.ts', () => ({
    ...jest.requireActual('../constants/config.ts'),
    IMAGE_DIMENSION_LIMIT: 200,
  }));

  it('should return correct format for various dimensions', () => {
    expect(getImageFormat(100, 100)).toBe('max-h-96 object-cover');
    expect(getImageFormat(50, 50)).toBe('max-h-96 object-cover');
    expect(getImageFormat(50, 200)).toBe('h-96 max-w-96 object-cover');
    expect(getImageFormat(200, 50)).toBe('max-w-96 h-full object-cover');
    expect(getImageFormat(200, 200)).toBe('max-w-96 h-full object-cover');
  });

  it('should handle edge cases correctly', () => {
    expect(getImageFormat(100, 300)).toBe('h-96 max-w-96 object-cover');
    expect(getImageFormat(300, 100)).toBe('max-w-96 h-full object-cover');
    expect(getImageFormat(300, 300)).toBe('max-w-96 h-full object-cover');
  });

  it('should handle cases where width is above limit and height is below limit and ratio is more than to 0.6', () => {
    expect(getImageFormat(700, 100)).toBe('max-w-96 h-full object-cover');
  });

  it('should handle cases where both width and height are above limit', () => {
    expect(getImageFormat(700, 700)).toBe('max-w-96 h-full object-cover');
    expect(getImageFormat(700, 1000)).toBe('max-w-96 h-full object-cover');
    expect(getImageFormat(400, 1000)).toBe('h-full object-cover');
  });

  it('should handle cases where ratio is less than or equal to 0.6', () => {
    expect(getImageFormat(500, 1000)).toBe('h-full object-cover');
    expect(getImageFormat(600, 1000)).toBe('h-full object-cover');
  });

  it('should handle cases where ratio is greater than 0.6', () => {
    expect(getImageFormat(65, 100)).toBe('max-h-96 object-cover');

    expect(getImageFormat(650, 1000)).toBe('max-w-96 h-full object-cover');
  });
});