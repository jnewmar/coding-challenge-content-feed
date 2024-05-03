import { NextApiRequest, NextApiResponse } from 'next/types';
import handler from './content';
import fetchMock from 'jest-fetch-mock';


beforeAll(() => {
  fetchMock.enableMocks();
});

describe('API Route: /api/content', () => {
  jest.mock('../../constants/config', () => ({
    API_ENDPOINT: 'https://stoplight.io/mocks/engine/fullstack-spec/52502230/content',
    API_DYNAMIC: 'dynamic=false',
  }));

  const mockResponse: NextApiResponse = {
    status: jest.fn().mockReturnThis(), // Mock the status method
    json: jest.fn().mockReturnThis(), // Mock the json method
    end: jest.fn().mockReturnThis(), // Mock the end method
    send: jest.fn().mockReturnThis(), // Mock the send method
  };

  const mockRequest: NextApiRequest = {
    method: 'GET', // Set the HTTP method
    url: '/api/content', // Set the request URL
    query: {}, // Set the query parameters
    body: {}, // Set the request body
    headers: {}, // Set the request headers
    cookies: {}, // Set the request cookies
  };

  it('should fetch content successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ contentCards :[
      {
        id: 1,
        imageUri: 'https://picsum.photos/500/500',
        textData: {
          title: 'string',
          subTitle: 'string',
          body: 'string'.repeat(100), // Adjust according to your needs
          author: { first: 'string', last: 'string' },
        },
        metadata: { priority: 100, publishDate: '2019-08-24T14:15:22Z' },
        comments: [{ text: 'string', author: 'string', profilePic: 'https://picsum.photos/200', likes: 0 }],
      },
    ]}), { status: 200 });

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);

    const expectedPost = {
      id: 1,
      imageUri: 'https://picsum.photos/500/500',
      title: 'string',
      subtitle: 'string',
      description: 'string'.repeat(100),
      author: 'string string',
      priority: 100,
      comments: [{ message: 'string', author: 'string' }],
    };
    expect(mockResponse.json).toHaveBeenCalledWith([expectedPost]);
  });

  it('should return 500 error if fetch fails', async () => {
    fetchMock.mockReject(new Error('Failed to fetch'));

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error fetching content' });
  });
});

afterAll(() => {
  fetchMock.disableMocks();
});
