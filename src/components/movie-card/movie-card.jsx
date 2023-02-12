import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
        return (
            <Card
                className="h-100"
                onClick={() => {
                    onMovieClick(movie);
                }}
            >
                <Card.Img variant="top" src={movie.imageUrl}/> 
                <Card.Body>
                    <Card.Title>
                        {movie.Title}
                    </Card.Title>
                    <Card.Text>
                        {movie.Description}
                    </Card.Text>
                    <Card.Text>
                        Director: {movie.Director.Name}
                    </Card.Text>
                    <Card.Text>
                        Genre: {movie.Genre.Name}
                    </Card.Text>
                    <Button
                        onClick={() => {
                            onMovieClick(movie);
                        }}
                        variant="link"
                    >
                        Open
                    </Button>
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
    onMovieClick: PropTypes.func.isRequired
};