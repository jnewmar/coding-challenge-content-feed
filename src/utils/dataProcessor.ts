import { ExternalPost, Post } from "@/types/types";


export const processContentData = (data: ExternalPost[] ): Post[] => {
  return data.map((item: ExternalPost): Post => {
    return {
      id: item.id,
      title: item.textData.title,
      subtitle: item.textData.subTitle,
      description: item.textData.body,
      imageUri: item.imageUri,
      author: `${item.textData.author.first} ${item.textData.author.last}`,
      priority: item.metadata.priority,
      comments: item.comments.map((comment: any) => {
        return {
          author: comment.author,
          message: comment.text,
        };
      }),
    };
  }).sort((a: Post, b: Post) => b.priority - a.priority);
};
