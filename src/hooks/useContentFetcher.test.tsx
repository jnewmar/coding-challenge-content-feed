import React, { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useContentFetcher from './useContentFetcher';
import { API_ENDPOINT_INTERNAL } from '../constants/config';

describe('useContentFetcher', () => {


  it('should fetch content successfully', async () => {
    jest.mock('../constants/config', () => ({
      API_ENDPOINT_INTERNAL : "http://localhost:3000/api/content",
    }));


    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce([{ id: '1', title: 'Test Post' }]),
    });

    // Render a component that uses the hook
    const Component = () => {
      const { content, loading, error,  fetchComplete, setLoading } = useContentFetcher([]);

      useEffect(() => {
        setLoading(!fetchComplete);
      }, [fetchComplete, setLoading]);

      return (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {!loading && !error && (
            <ul>
              {content.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>
      );
    };

    render(<Component />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINT_INTERNAL);

    await waitFor(() => expect(screen.getByText('Test Post')).toBeInTheDocument());

  });
  it('should use probided content', async () => {
    jest.mock('../constants/config', () => ({
      API_ENDPOINT_INTERNAL : "http://localhost:3000/api/content",
    }));

    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce([{ id: '1', title: 'Test Post' }]),
    });

    // Define initial content
    const initialContent = [{ id: '2', title: 'Initial Content Post' }];

    // Component that uses the hook with initial content
    function TestComponent() {
      const { content, loading, error, fetchComplete, setLoading } = useContentFetcher(initialContent);

      // Simulate effect to update loading state based on fetchComplete
      useEffect(() => {
        setLoading(!fetchComplete);
      }, [fetchComplete, setLoading]);


      useEffect(() => {
        if (content.length > 0) {
          setLoading(false);
        }
      }, [content, setLoading]);

      // Render loading, error, and content
      return (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {!loading && !error && (
            <ul>
              {content.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    // Render the TestComponent
    render(<TestComponent />);

    // Assert fetch is not called when initialContent is provided
    expect(global.fetch).not.toHaveBeenCalled();

    // Assert initial content is rendered
    await waitFor(() => expect(screen.getByText('Initial Content Post')).toBeInTheDocument());
  });

});
