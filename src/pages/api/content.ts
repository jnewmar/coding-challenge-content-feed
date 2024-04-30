// pages/api/content.ts
export default async function handler(req, res) {
  try {
    const response = await fetch('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content', {
      headers: {
        'Accept': 'application/json',
        'Prefer': 'code=200, dynamic=true'
      }
    });
    const data = await response.json();

    let out = data.contentCards.map((item: any) => {
      return {
        id: item.id,
        title: item.textData.title,
        subtitle: item.textData.subTitle,
        description: item.textData.body,
        imageUri: item.imageUri,
        author: item.textData.author.first + " " + item.textData.author.last,
        priority: item.metadata.priority,
        comments: item.comments.map((comment: any) => {
          return {
            author: comment.author,
            text: comment.text
          }
        })
      }
    }) 

    out.sort((a, b) => b.priority - a.priority);
    res.status(200).json(out);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Error fetching content' });
  }
}
