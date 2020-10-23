import React from 'react';
import { Card } from 'react-bootstrap'
import { Col, Row, Container } from 'react-bootstrap';

const PostTemplate = (props) => (

    <Container>
        <Row>
            <Col xs={6} md={4}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={props.imgUrl} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
);

export default PostTemplate;