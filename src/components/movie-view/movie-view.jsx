import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from 'react-router';
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({movies, username, FavoriteMovies}) => {     
    
    const { Title } = useParams();
    const movie = movies.find((movie) => movie.Title === Title ); 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem('token');
    const [movieExists, setMovieExists] = useState(false);
    const [disableRemove, setDisableRemove] = useState(true);
    const [userFavoriteMovies, setUserFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: FavoriteMovies);

    let similarMovies = movies.filter(
        ({ Genre: { Name }, Title }) =>
             Name == movie.Genre.Name && Title != movie.Title
    );

    const addFavoriteMovies = (_id) => {
        fetch(`https://movieapi-dcj2.onrender.com/users/${storedUser.Username}/movies/${_id}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(storedToken);
            setUserFavoriteMovies(response.FavoriteMovies)
            if (response) {
                alert("Movie added to Favorites!");
                localStorage.setItem("user", JSON.stringify (response))
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        });
    };

    const removeFavoriteMovie = (_id) => {
        fetch (`https://movieapi-dcj2.onrender.com/users/${storedUser.Username}/movies/${_id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response) {
                alert("Movie removed from Favorites");
                localStorage.setItem("user", JSON.stringify (response))
                window.location.reload();

            } else {
                alert("Something went wrong");
            }
        });
    };

    const movieAdded = (_id) => {
        const hasMovie = userFavoriteMovies.some((m) => m._id === _id);

        if (hasMovie) {
            setMovieExists(true)
        }
    };

    const movieRemoved = (_id) => {
        const hasMovie = userFavoriteMovies.some((m) => m._id === _id);

        if (hasMovie) {
            setDisableRemove(false)
        }
    };

    console.log("movieExists", movieExists)

    useEffect (() => {
        movieAdded();
        movieRemoved()
    },[])
    
    return (
        <Container>
            {movies.length === 0 ? (
                <Col>
                    This list is empty!
                </Col>
            ) : (
                <>
                    <Card 
                        className="h-100 movieView mb-4"
                    > 
                        <Row className='h-100 mb-4 movieViewImage'>
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
                        <Card.Body className="mb-4">
                            <Card.Title className="mb-4 movieViewTitle">
                                {movie.Title}
                            </Card.Title>
                            <Card.Text className="mb-4">
                                <Row className="mb-4 movieViewDescription">
                                    <Col>{movie.Description}</Col>
                                </Row>
                                <Row className="movieViewDirector">
                                    <Col>Director: </Col>
                                    <Col>{movie.Director.Name}</Col>
                                </Row>
                                <Row className="mb-4 movieViewGenre">
                                    <Col>Genre:</Col>
                                    <Col>{movie.Genre.Name}</Col>
                                </Row>
                            </Card.Text>
                            <Row className="mb-4 movieViewButtons">
                                <Col>
                                    <Button
                                        className="button-add-favorite"
                                        onClick={() => addFavoriteMovies(movie._id)}
                                        disabled={movieExists}
                                    >
                                        Add to Favorites
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant="primary"
                                        onClick={() => removeFavoriteMovie(movie._id)}
                                        disabled={disableRemove}
                                    >
                                        Remove from Favorites
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>                          
                    </Card>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className='mb-4'>
                                Similar Movies
                            </Card.Title>
                            <Card.Text>
                                {similarMovies.map((movie) => (
                                    <Col className='mb-4' key={movie.Title}>
                                        <MovieCard
                                            movie={movie}
                                        />
                                    </Col>
                                ))}
                            </Card.Text>
                        </Card.Body>                        
                    </Card>
                </>
            )}
        </Container>
    )
}

MovieView.propTypes = {
    movies: PropTypes.array,
    username: PropTypes.string,
    FavoriteMovies: PropTypes.array
};