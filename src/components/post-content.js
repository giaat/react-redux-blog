import React from 'react';

const PostContent = props => {
  const { post } = props;
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Auteur: {post.author}</p>
    </div>
  );
};

export default PostContent;
