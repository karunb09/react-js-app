import React from 'react';
import Card from 'react-bootstrap/Card'
import styles from './PostsTemplate.css';

const PostTemplate = (props) => (
    <div className={styles.wrapper}>
        <div className={styles.one}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imgUrl} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    </div>
);

export default PostTemplate;