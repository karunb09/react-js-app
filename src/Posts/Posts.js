import React, { Component } from 'react';
import axios from 'axios';


class Posts extends Component {
    posts = [];
    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/photos' )
            .then( response => {
                console.log( response.data );
            } );
    }

    

    render () {
        return (
            <div>
                <h1>hello</h1>
            </div>
        );
    }
}

export default Posts;