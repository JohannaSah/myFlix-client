import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
        return (
            <Card
                className="h-100 movieCard bg-light"

            >
                <Link 
                    to={`/movies/${encodeURIComponent(movie.Title)}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <Row className='mb-4'>
                        <Col 
                            className='text-center'
                        >
                        <Card.Img 
                            variant="top" 
                            src={movie.imageUrl}
                            className='img-fluid w-100 h-auto movie-card-img'
                        />
                        </Col>
                    </Row>
                    <Card.Body>
                        <Card.Title className="movieCardTitle text-center">
                            {movie.Title}
                        </Card.Title>
                    </Card.Body>
                </Link>
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