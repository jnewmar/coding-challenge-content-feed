

import { Post } from '@/types/types';
import { createImageElement, getImageFormat } from '../utils/utils';
import React, { useState, useEffect } from 'react';

const FeedPost = ({ post , index, initialPreloaded=false}: {post:Post, index:number, initialPreloaded:boolean}) => {
  const [expanded, setExpanded] = useState(false);

  const handleReadMoreOrLess = () => {
    setExpanded(!expanded);
  };


  const [preloaded, setPreloaded] = useState(initialPreloaded);

  const preloadImage = (index: string | number) => {
    return new Promise<void>((resolve, reject) => {
      const img = createImageElement();
      img.id = 'img-' + index;
      img.setAttribute('data-testid', img.id);
      img.src = post.imageUri;
      img.alt = post.title;


      img.onload = () => {
        img.className = getImageFormat(img.width, img.height);
        document.getElementById('imgContainer-' + index)?.appendChild(img);
        resolve(); // Resolve the Promise when the image is loaded
      };
      img.onerror = () => {
        const divErrorMessage = document.createElement('div');
        divErrorMessage.id = 'img-error-' + index;
        divErrorMessage.setAttribute('data-testid', divErrorMessage.id);
        divErrorMessage.innerHTML = 'Error Loading image';
        document.getElementById('imgContainer-' + index)?.appendChild(divErrorMessage);
        reject('Error Loading image');
      };
    });
  };

  const loadImage = async () => {
    try {
      await preloadImage(index);
      setPreloaded(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadImage()
  }, [])


  return (
    <div id={`postContainer-${index}`} className="max-w-xl rounded overflow-hidden shadow-xl my-4" style={{ display: preloaded ? 'block' : 'none' }}>
      <div>
        <div className="w-full max-h-96 justify-center items-center bg-black flex flex-col overflow-hidden" id={`imgContainer-${index}`}>
        </div>
        <div className="max-w-xl w-full px-6 py-4">
          <div className="w-1/2 font-bold truncate text-xl float-left">{post.title}</div>
          <div className="w-1/2  truncate text-md float-right text-right">{post.author}</div>
        </div>
        <div className="w-full font-bold truncate text-md px-6 py-1">{post.subtitle}</div>
        <div className="max-w-xl w-full px-6 py-4 text-balance break-words ">
          <p className="text-gray-700 text-md text-base" data-testid="description">
            {expanded ? post.description : `${post.description.substring(0, 150)}` } { !expanded && post.description.length > 150 ? '...' : ''}
            {expanded && post.description.length > 150 && <span className="read-more" > <span className="show-more font-bold cursor-pointer" data-testid="showLess" onClick={handleReadMoreOrLess}>Show Less</span></span>}
            {!expanded && post.description.length > 150 && <span className="read-more"> <span className="show-more font-bold cursor-pointer" data-testid="readMore" onClick={handleReadMoreOrLess}>Read More</span></span>}
          </p>
        </div>
        <div className="max-w-xl w-full px-6 pt-4 pb-2">
          {post.comments && post.comments.map((comment, index: number) => (
            <div key={index} className="text-gray-700">
              <strong>{comment.author}:</strong> {comment.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPost;