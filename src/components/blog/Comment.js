import React from 'react';
import "../../componentcss/Blog.css"; //for css

function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="comment-content">
        <p>{comment.content}</p>
        <div className="comment-meta">
          <span>By {comment.user.username}</span>
          <span> on {new Date(comment.timestamp).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;

