import { useState, useEffect } from 'react';
import { Post } from '../types/types';
import { API_ENDPOINT_INTERNAL } from '../constants/config';

const useContentFetcher = (initialContent:Post[]) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchComplete, setFetchComplete] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT_INTERNAL);
      const data = await response.json();
      setContent(data);
      setFetchComplete(true);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialContent && initialContent.length > 0) {
      setContent(initialContent);
      setLoading(false);
    } else {
      setLoading(true);
      fetchData();
    }
  }, [initialContent]);

  return { content, loading, error, fetchComplete, setLoading };
};

export default useContentFetcher;
