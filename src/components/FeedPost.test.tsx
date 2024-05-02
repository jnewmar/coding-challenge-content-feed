import { debug } from 'jest-preview';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedPost from '../components/FeedPost';
import * as Utils from '../utils/utils'; 

const mockPost = {
  id: 1,
  title: 'Test Post',
  subtitle: 'Test Subtitle',
  description: 'This is a test description.',
  imageUri: 'https://picsum.photos/500/500',
  author: 'Test Author',
  priority: 1,
  comments: [
    { author: 'Comment Author 1', message: 'Comment Message 1' },
    { author: 'Comment Author 2', message: 'Comment Message 2' },
  ],
};

const mockLongPost = {
  ...mockPost,
  description: 'This is a test description.'.repeat(10), // A description longer than 150 characters
};

 describe('FeedPost', () => {
  it('renders with correct post data with short descripton', async () => {
    render(<FeedPost post={mockPost} index={0} initialPreloaded={true} />);
    debug();

    expect(screen.getByText('Test Post')).toBeInTheDocument(); // Check if title is rendered
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument(); // Check if subtitle is rendered
    expect(screen.getByText('Test Author')).toBeInTheDocument(); // Check if author is rendered
    expect(screen.getByText('Comment Author 1:')).toBeInTheDocument(); // Check if first comment is rendered
    expect(screen.getByText('Comment Message 1')).toBeInTheDocument(); // Check if first comment message is rendered
    expect(screen.getByText('Comment Author 2:')).toBeInTheDocument(); // Check if second comment is rendered
    expect(screen.getByText('Comment Message 2')).toBeInTheDocument(); // Check if second comment message is rendered
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toHaveTextContent('This is a test description.'); // Check if description is rendered
    // Check if Read More link is not present
    expect(screen.queryByTestId('readMore')).toBeNull();

    // Check if Show Less link is not present
    expect(screen.queryByTestId('showLess')).toBeNull();
  });

  it('renders with truncated description and Read More', () => {
    render(<FeedPost post={mockLongPost} index={0} initialPreloaded={true} />);

    // Check if description is truncated to 150 characters
    expect(screen.getByTestId('description')).toHaveTextContent('This is a test description.'.repeat(10).substring(0, 150));

    // Check if Read More link is present
    expect(screen.getByTestId('readMore')).toBeInTheDocument();
  });

  it('expands description on clicking Read More', () => {
    render(<FeedPost post={mockLongPost} index={0} initialPreloaded={true} />);

    // Click Read More link
    fireEvent.click(screen.getByTestId('readMore'));

    // Check if full description is present
    expect(screen.getByTestId('description')).toHaveTextContent('This is a test description.'.repeat(10));

    // Check if Show Less link is present
    expect(screen.getByTestId('showLess')).toBeInTheDocument();
  });

  it('collapses description on clicking Show Less', () => {
    render(<FeedPost post={mockLongPost} index={0} initialPreloaded={true} />);

    // Click Read More link
    fireEvent.click(screen.getByTestId('readMore'));

    // Click Show Less link
    fireEvent.click(screen.getByTestId('showLess'));

    // Check if description is truncated to 150 characters
    expect(screen.getByTestId('description')).toHaveTextContent('This is a test description.'.repeat(10).substring(0, 150));

    // Check if Read More link is present
    expect(screen.getByTestId('readMore')).toBeInTheDocument();
  });


  describe('preloadImage', () => {
    it('should append the image in the container and show the post when image is loaded', async () => {
      // Arrange
      const index = 0;

      const mockImage = new Image();
      const preloadImageMock = jest.spyOn(Utils, 'createImageElement'); 
    
      preloadImageMock.mockImplementation(() => {
        return mockImage;
      });

      const { container } = render(<FeedPost post={mockPost} index={index} initialPreloaded={false} />);
      expect(container.querySelector(`#postContainer-${index}`)).not.toBeVisible;

      fireEvent.load(mockImage);

      const img = container.querySelector(`#img-${index}`)
      const imgError = container.querySelector(`#img-error-${index}`)

      await waitFor(() => expect(imgError).toBeNull());
      await waitFor(() => expect(img).toBeInTheDocument());
      preloadImageMock.mockRestore();
    });

    it('should append the div image error in the container and show the post when image triggers an error', async () => {
      const index = 0;

      const mockImage = new Image();
      const preloadImageMock = jest.spyOn(Utils, 'createImageElement'); 
    
      preloadImageMock.mockImplementation(() => {
        return mockImage;
      });

      const { container } = render(<FeedPost post={mockPost} index={index} initialPreloaded={false} />);
      expect(container.querySelector(`#postContainer-${index}`)).not.toBeVisible;

      fireEvent.error(mockImage);

      await waitFor(() => expect(container.querySelector(`#postContainer-${index}`)).toBeVisible);

      const img = container.querySelector(`#img-${index}`)
      const imgError = container.querySelector(`#img-error-${index}`)

      await waitFor(() => expect(img).toBeNull());
      await waitFor(() => expect(imgError).toBeInTheDocument());

      preloadImageMock.mockRestore();
    });
  });

});