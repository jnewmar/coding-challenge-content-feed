import { createImageElement } from '../utils/utils';

describe('createImageElement', () => {
  it('should return a new Image element if no argument is provided', () => {
    // Arrange

    // Act
    const result = createImageElement();

    // Assert
    expect(result instanceof Image).toBe(true);
  });

  it('should return the provided image element if an image is provided', () => {
    // Arrange
    const img = new Image();

    // Act
    const result = createImageElement(img);

    // Assert
    expect(result).toBe(img);
  });
});