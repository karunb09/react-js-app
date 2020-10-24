import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, ListGroup, Navbar, Form } from 'react-bootstrap';
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


    handleInputChange = (event) => {
        this.setState({
            loaderFlag: false
        })
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
        axios.get('https://jsonplaceholder.typicode.com/photos?_page=' + this.pageNumber + '&_limit=20').then(response => {
            this.setState({ posts: this.state.posts.concat(response.data) });
            this.setState({ filteredPosts: this.state.filteredPosts.concat(response.data) });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="Container-fluid">
                <Navbar bg="dark" variant="dark" className="justify-content-center">
                    <Form >
                        <input type="text" placeholder="Search for..." value={this.state.query} onChange={this.handleInputChange} />
                    </Form>
                </Navbar>
                <br />
                {this.state.filteredPosts.length > 0 ? (

                    <InfiniteScroll dataLength={this.state.posts.length}
                        next={this.LoadData}
                        hasMore={true}
                        // loader={<img src={logo} alt="loader"  width="100" height="100"/>}
                        loader={<div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>}
                        endMessage={<p style={{ textAlign: 'center' }}><h2><b>Yay! You have seen it all</b></h2></p>}
                    >
                        <ListGroup variant="flush">
                            <Row>
                                {this.state.filteredPosts.map(post => (
                                    <Col md={4} key={post.id}>
                                        <ListGroup.Item>
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
                            <span className="sr-only"></span>
                        </div>) : <p>No data</p>
                }
            </div>
        );
    }

}

export default Posts;