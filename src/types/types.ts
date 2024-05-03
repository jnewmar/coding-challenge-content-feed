// types/types.ts
export interface Post {
    id: number;
    title: string;
    subtitle: string;
    imageUri: string;
    description: string;
    author: string;
    priority: number;
    comments: Comment[];
  }

export interface Comment {
    author: string;
    message: string;
  }

export interface ExternalPost {
    id: number;
    textData: {
        title: string;
        subTitle: string;
        body: string;
        author:
        { first: string;
            last: string;
        };
    };
    imageUri: string;
    metadata: {
        priority: number;
        publishDate: string;
    };
    comments: ExternalComment[];
  }

export interface ExternalComment {
    text: string;
    author: string;
    profilePic: string;
    likes: number;
  }
