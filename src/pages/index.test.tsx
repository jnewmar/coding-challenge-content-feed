import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home, { getServerSideProps } from '../pages/index';
import useContentFetcher from '../hooks/useContentFetcher';
import { processContentData } from '../utils/dataProcessor';
import { API_ENDPOINT, API_DYNAMIC } from '../constants/config';
import fetchMock from 'jest-fetch-mock';

jest.mock('../hooks/useContentFetcher', () => jest.fn());

describe('Home Page', () => {
  jest.mock('../constants/config', () => ({
    API_ENDPOINT: 'https://stoplight.io/mocks/engine/fullstack-spec/52502230/content',
    API_DYNAMIC: 'dynamic=false',
  }));

  const mockContent = [
    {
      id: '1',
      title: 'Title 1',
      subtitle: 'Subtitle 1',
      description: 'Description 1',
      imageUri: 'https://example.com/image1.jpg',
      author: 'Author 1',
      priority: 1,
      comments: [],
    },
    {
      id: '2',
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      description: 'Description 2',
      imageUri: 'https://example.com/image2.jpg',
      author: 'Author 2',
      priority: 2,
      comments: [],
    },
  ];

  const mockExternalContent = [
    {
      id: 1,
      imageUri: 'https://picsum.photos/500/500',
      textData: {
        title: 'string',
        subTitle: 'string',
        body: 'string'.repeat(100),
        author: { first: 'string', last: 'string' },
      },
      metadata: { priority: 100, publishDate: '2019-08-24T14:15:22Z' },
      comments: [{ text: 'string', author: 'string', profilePic: 'https://picsum.photos/200', likes: 0 }],
    }
  ];

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it('renders loading state when content is loading', async () => {
    useContentFetcher.mockReturnValue({ loading: true });
    render(<Home initialContent={[]} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });


  it('renders error message when there is an error', () => {
    const errorMessage = 'Failed to fetch content';
    useContentFetcher.mockReturnValue({ error: new Error(errorMessage) });
    render(<Home initialContent={[]} />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders content when loaded successfully', () => {
    useContentFetcher.mockReturnValue({ content: mockContent , loading: false, error: null ,  fetchComplete: false, setLoading: jest.fn() });
    render(<Home initialContent={[]} />);
    mockContent.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.author)).toBeInTheDocument();
      expect(screen.getByText(post.description)).toBeInTheDocument();
    });
  });

  it('fetches content from API and passes it to the component', async () => {
    const mockData = {
      contentCards: mockExternalContent,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const props = await getServerSideProps();


    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINT, {
      headers: {
        'Accept': 'application/json',
        'Prefer': `code=200, ${API_DYNAMIC}`,
      },
    });

    const received = props.props.initialContent
    const expected = processContentData(mockData.contentCards) ?? [];

    expected.forEach((post, index) => {
      expect(post.id).toEqual(received[index].id);
      expect(post.title).toEqual(received[index].title);
      expect(post.subtitle).toEqual(received[index].subtitle);
      expect(post.description).toEqual(received[index].description);

      expect(post.imageUri).toEqual(received[index].imageUri);
      expect(post.author).toEqual(received[index].author);
      expect(post.priority).toEqual(received[index].priority);

      expect(post.comments).toHaveLength(received[index].comments.length);
      post.comments.forEach((comment, commentIndex) => {
        expect(comment.author).toEqual(received[index].comments[commentIndex].author);
        expect(comment.message).toEqual(received[index].comments[commentIndex].message);
      });
    })
  });

  it('handles API fetch failure gracefully', async () => {
    const errorMessage = 'Failed to fetch content';

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValueOnce({ message: errorMessage }),
    });

    const props = await getServerSideProps();

    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINT, {
      headers: {
        'Accept': 'application/json',
        'Prefer': `code=200, ${API_DYNAMIC}`,
      },
    });

    expect(props).toEqual({
      props: {
        error: { message: errorMessage },
      },
    });
  });

});
