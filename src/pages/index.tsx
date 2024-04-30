// pages/index.tsx
import { useEffect, useState } from 'react';
import InstagramPost from '../components/Post';

export default function Home() {
  const [content, setContent] = useState([]);


  useEffect(() => {
    fetch('/api/content')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error fetching content:', error));
  }, []);

  return (
    <div className="container flex flex-col items-center">
        {content.length === 0 ? 
          (<p className="text-center">Loading...</p>)
        :
        (<>
          {content.map(item => (
            <InstagramPost post={item} />
            //TODO: only display the next element if the previous one has been loaded
            ))}
        </>)}
    </div>
  );
}
