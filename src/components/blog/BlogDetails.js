import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import the useParams hook
import CommentSection from './CommentSection';
import '../../componentcss/Blog.css';

function BlogDetails() {
  const { id } = useParams();  // Destructure the id parameter from useParams
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}/`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };

    fetchPost();
  }, [id]);  // Make sure the effect runs when the id changes

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="blog-details-container">
      <div className="blog-post">
        <h1 className="blog-title">{post.title}</h1>
        <p className="blog-meta">By {post.author?.username} on {new Date(post.created_at).toLocaleDateString()}</p>
        <div className="blog-content">{post.content}</div>
        <hr className="separator" />
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}

export default BlogDetails;

