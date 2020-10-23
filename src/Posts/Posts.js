import React, { Component } from 'react';
import axios from 'axios';
import PostsTemplate from '../PostsTemplate/PostsTemplate';


class Posts extends Component {
    state = {
        posts: []
    }
    posts = [];
    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/photos' )
            .then( response => {
                // console.log( response.data );
                this.setState({posts : response.data});
            } );
    }

    

    render () {
        const allPosts = this.state.posts.map(post => {
            return <PostsTemplate title={post.title} imgUrl={post.url}/>
        })
        return (
                <section className="PostsTemplate">
                    {allPosts}
                </section>
        );
    }
}

export default Posts;