import { createImageElement } from '../utils/utils';

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