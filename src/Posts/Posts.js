import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Container, ListGroup } from 'react-bootstrap';
import PostsTemplate from '../PostsTemplate/PostsTemplate';
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from 'react-bootstrap'


class Posts extends Component {

    pageNumber = 0;
    state = {
        query: "",
        loaderFlag: true,
        posts: [],
        filteredPosts: [],
    }

    
    handleInputChange = event => {
        this.state.loaderFlag = false;
        const query = event.target.value;
        this.setState(prevState => {
            const filteredPosts = prevState.posts.filter(element => {
                return element.title.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredPosts,
            };
        });
    };


    componentDidMount() {
        this.LoadData();
    }

    LoadData = () => {
        this.pageNumber++;
        axios.get('https://jsonplaceholder.typicode.com/photos?_page='+this.pageNumber+'&_limit=20').then(response =>{
            this.setState({ posts : this.state.posts.concat(response.data)});
            this.setState({ filteredPosts: this.state.filteredPosts.concat(response.data)});
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        return (
            <div className="Container-fluid">
                <div className="searchForm">
                    <form>
                        <input
                            placeholder="Search for..."
                            value={this.state.query}
                            onChange={this.handleInputChange}
                        />
                    </form>
                </div>
                {this.state.filteredPosts.length > 0 ? (

                    <InfiniteScroll dataLength={this.state.posts.length}
                        next={this.LoadData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                    >
                        <ListGroup variant="flush">
                            <Row>
                                {this.state.filteredPosts.map(post => (
                                    <Col md={4}>
                                        <ListGroup.Item key={post.id}>
                                            <Card>
                                                <Card.Img variant="top" src={post.url} />
                                                <Card.Body>
                                                    <Card.Title>{post.title}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </ListGroup.Item>
                                    </Col>
                                ))}
                            </Row>

                        </ListGroup>
                    </InfiniteScroll>
                ) : this.state.loaderFlag ?
                        (<div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>) : <p>No data</p>
                }
            </div>
            /* <div className="Row">
               <Col xs={6} md={4} lg={12}>   
               </Col>                               
               </div>
           </div> */
        );
    }

}

export default Posts;