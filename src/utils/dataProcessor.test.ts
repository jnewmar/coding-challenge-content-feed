// utils.test.ts
import { processContentData } from '../utils/dataProcessor';
import { ExternalPost, Post } from '@/types/types';

describe('processContentData', () => {
  it('should transform ExternalPost data into Post data and sort by priority', () => {
    // Arrange
    const externalPosts: ExternalPost[] = [
      {
        id: '1',
        imageUri: 'https://example.com/image1.jpg',
        textData: {
          title: 'Title 1',
          subTitle: 'Subtitle 1',
          body: 'Body 1',
          author: {
            first: 'John',
            last: 'Doe',
          },
        },
        metadata: {
          priority: 3,
          publishDate: '2022-04-30T12:00:00Z',
        },
        comments: [
          {
            author: 'Comment Author 1', text: 'Comment Message 1',
            profilePic: 'https://example.com/image1.jpg',
            likes: 10
          },
          {
            author: 'Comment Author 2', text: 'Comment Message 2',
            profilePic: 'https://example.com/image1.jpg',
            likes: 10
          },
        ],
      },
      // Add more ExternalPost data as needed
    ];

    // Act
    const result = processContentData(externalPosts);

    // Assert
    expect(result).toHaveLength(externalPosts.length); // Check if the number of posts is the same
    // Check if each post is transformed correctly
    result.forEach((post: Post, index: number) => {
      expect(post.id).toEqual(externalPosts[index].id);
      expect(post.title).toEqual(externalPosts[index].textData.title);
      expect(post.subtitle).toEqual(externalPosts[index].textData.subTitle);
      expect(post.description).toEqual(externalPosts[index].textData.body);
      expect(post.imageUri).toEqual(externalPosts[index].imageUri);
      expect(post.author).toEqual(`${externalPosts[index].textData.author.first} ${externalPosts[index].textData.author.last}`);
      expect(post.priority).toEqual(externalPosts[index].metadata.priority);
      // Check if comments are transformed correctly
      expect(post.comments).toHaveLength(externalPosts[index].comments.length);
      post.comments.forEach((comment, commentIndex) => {
        expect(comment.author).toEqual(externalPosts[index].comments[commentIndex].author);
        expect(comment.message).toEqual(externalPosts[index].comments[commentIndex].text);
      });
    });
    // Check if posts are sorted by priority
    expect(result).toEqual(result.slice().sort((a, b) => b.priority - a.priority));
  });
});
