import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import "../../componentcss/Blog.css"; //for css

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}/comments/`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/posts/${postId}/comments/`, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment', error);
    }
  };

  return (
    <div className="comment-section">
      <h2 className="comment-section-title">Comments</h2>
      {loading ? (
        <div className="loading">Loading comments...</div>
      ) : (
        <div className="comments-list">
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleCommentChange}
          required
        />
        <button type="submit" className="comment-submit-btn">Post Comment</button>
      </form>
    </div>
  );
}

export default CommentSection;

