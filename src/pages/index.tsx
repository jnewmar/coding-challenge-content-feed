import FeedPost from '../components/FeedPost';
import useContentFetcher from '../hooks/useContentFetcher';
import { Post } from '../types/types';
import { processContentData } from '../utils/dataProcessor';
import { API_DYNAMIC, API_ENDPOINT } from '../constants/config';
import React, { useEffect } from 'react';
export async function getServerSideProps() {
  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        'Accept': 'application/json',
        'Prefer': 'code=200, ' + API_DYNAMIC
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    const data = await response.json();
    return {
      props: { initialContent: processContentData(data.contentCards) },
    };
  } catch (error: Error) {
    return {
      props: { error: { message: error.message } },
    };
  }
}

export default function Home({ initialContent = [] } : {initialContent: Post[]}) {
  const { content, loading, error , setLoading } = useContentFetcher(initialContent);

  useEffect(() => {
    if (content && content.length > 0) {
      setLoading(false);
    }
  }, [content, setLoading]);

  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  }

  return (
    <div className="container flex flex-col items-center">
      {loading ?
        (<p className="text-center" data-testid="loading" id="loading">Loading...</p>)
        :
        (<>
          {content.map((item, index) => (
            <FeedPost key={item.id} index={index} post={item} />
          ))}
        </>)}
    </div>
  );
}
