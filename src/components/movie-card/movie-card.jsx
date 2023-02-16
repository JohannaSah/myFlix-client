import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
        return (
            <Card
                className="h-100 movieCard"

            >
                <Row className='h-50'>
                    <Col 
                        className='h-100 text-center mt-3'
                    >
                    <Card.Img 
                        variant="top" 
                        src={movie.imageUrl}
                        className='img-fluid h-100 w-auto movie-card-img'
                    />
                    </Col>
                </Row>
                <Card.Body>
                    <Card.Title>
                        {movie.Title}
                    </Card.Title>
                    <Card.Text>
                        {movie.Description}
                    </Card.Text>
                    <Row className='d-flex flex-row justify-content-between align-items-baseline mt-auto'>
                        <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
                            <Button
                                variant="link"
                            >
                                Details
                            </Button>
                        </Link>
                    </Row>
                </Card.Body>
            </Card>
        );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }),
        Description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        Genre: PropTypes.shape({
            Name: PropTypes.string
        })
    }).isRequired,
};