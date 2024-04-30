

import React, { useState, useEffect } from 'react';

const InstagramPost = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  const handleReadMoreOrLess = () => {
    setExpanded(!expanded);
  };


  const [preloaded, setPreloaded] = useState(false);

  useEffect(() => {
    const preloadImage = () => {
      const img = new Image();
      img.src = post.imageUri;
      img.onload = () => {
        setPreloaded(true);
      };
    };

    preloadImage();
  }, [post.imageUri]);

  return (
        <div className="max-w-xl rounded overflow-hidden shadow-xl my-4">
            {preloaded &&
            (
              <div>
                <div className="w-full bg-black flex flex-col items-center">
                    <img className="w-full max-h-96 object-cover rounded-md" src={post.imageUri} alt="{item.title}" />
                </div>
                <div className="max-w-xl w-full px-6 py-4">
                  <div className="w-1/2 font-bold truncate text-xl float-left">{post.title}</div>
                  <div className="w-1/2  truncate text-md float-right text-right">{post.author}</div>
                </div>
                <div className="w-full font-bold truncate text-md px-6 py-1">{post.subtitle}</div>
                <div className="max-w-xl w-full px-6 py-4">
                    <p className="text-gray-700 text-md text-base">
                    {expanded ? post.description : `${post.description.substring(0, 150)}...`}
                        {expanded && <span className="read-more"> <span className="show-more font-bold" onClick={handleReadMoreOrLess}>Show Less</span></span>}
                        {!expanded && <span className="read-more"> <span className="show-more font-bold" onClick={handleReadMoreOrLess}>Read More</span></span>}
                    </p>
                    </div>
                    <div className="max-w-xl w-full px-6 pt-4 pb-2">
                        {post.comments && post.comments.map((comment, index) => (
                        <div key={index} className="text-gray-700">
                            <strong>{comment.author}:</strong> {comment.text}
                        </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      );
};
  
export default InstagramPost;