import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaTags } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';


import { baseUrl } from "../exports";
import { Link } from 'react-router-dom';

function BlogPosts() {
    const [posts, setPosts] = useState([]);
  

    useEffect(() => {
        axios.get(baseUrl + '/posts/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

  
    return (
    <Container className="mt-6"> 
        <div className="container-xxl py-5">
          {/*Blog posts */}
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3 mt-5">
                Blog Posts
              </h6>
              <h1 className="mb-5 fs-6 text-muted ">Our Daily Thoughts</h1>
          </div>
          <div className="row g-4 justify-content-center">
                    {posts.map(post => (
                        <Col md={4} key={post.id} className=" col-lg-3 col-md-4 col-sm-6 wow fadeInUp mb-4">
                            <Card className="card">
                                {post.image && <Card.Img variant="top" src={post.image} />}
                                <Card.Body className="card-body">
                                    <Card.Title className="card-title">{post.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        By {post.author} <br />
                                        <FaCalendarAlt /> {new Date(post.published_date).toLocaleDateString()}
                                    </Card.Subtitle>
                                    <Card.Text  className="card-text text-dark">
                                        {post.excerpt}
                                    </Card.Text >
                                    <Card.Text className="card-text text-dark">
                                        <FaTags /> {post.tags.split(',').map(tag => (
                                            <span key={tag} className="badge bg-info me-1">{tag.trim()}</span>
                                        ))}
                                    </Card.Text>
                                    <Link to={'/blog_details'}>
                                    <Button variant="primary">Read More</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </div>
            </div>
            </div>
    </Container>
    );
}
export default BlogPosts;
