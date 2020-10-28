import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Navbar, Form } from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment } from '../../store/actions/actionTypes'


class Posts extends Component {

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
        axios.get('https://jsonplaceholder.typicode.com/photos?_page=' + this.props.pagen + '&_limit=20').then(response => {
            this.setState({ posts: this.state.posts.concat(response.data) });
            this.setState({ filteredPosts: this.state.filteredPosts.concat(response.data) });
        }).catch(err => {
            console.log(err);
        })
        this.props.increment();
    }

    render() {
        return (
            <div className="Container-fluid">
                <Navbar bg="dark" variant="dark" className="justify-content-center">
                    <Form className="form">
                        <input name = "input" type="text" id="search" placeholder="Search with title..." value={this.state.query} onChange={this.handleInputChange} />
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
                            <div className="row">
                                {this.state.filteredPosts.map(post => (
                                    <div key={post.id} className="col-md-4">
                                        <ListGroup.Item>
                                            <Card>
                                                <Card.Img variant="top" src={post.url} />
                                                <Card.Body>
                                                    <Card.Title>{post.title}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </ListGroup.Item>
                                    </div>
                                ))}
                            </div>

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

function mapStateToProps(state){
    return {
        pagen: state.pageNumber
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({increment: increment},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Posts);