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
    const [movieExists, setMovieExists] = useState(false);
    const [disableRemove, setDisableRemove] = useState(true);
    const [userFavoriteMovies, setUserFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: FavoriteMovies);

    let similarMovies = movies.filter(
        ({ Genre: { Name }, Title }) =>
             Name == movie.Genre.Name && Title != movie.Title
    );

    const addFavoriteMovies = () => {
        fetch(`https://movieapi-dcj2.onrender.com/users/${username}/movies/${Title}`,
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

    const removeFavoriteMovie = () => {
        fetch (`https://movieapi-dcj2.onrender.com/users/${username}/movies/${Title}`,
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

    const movieAdded = () => {
        const hasMovie = userFavoriteMovies.some((m) => m.Title === Title);

        if (hasMovie) {
            setMovieExists(true)
        }
    };

    const movieRemoved = () => {
        const hasMovie = userFavoriteMovies.some((m) => m.Title === Title);

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
                    <Card> 
                        <Row className='d-flex flex-row-reverse p-3'>
                            <Col md={5} className='text-center text-md-end'>
                            <Card.Img
                                src={movie.imageUrl}
                                alt={`Poster for ${movie.Title}`}
                                className='img-fluid h-100 w-auto movie-view-img'
                            />
                            </Col>
                            <Col md={7} className='d-flex flex-column'>
                                <Row className='d-flex flex-row  justify-content-between'>
                                    <Col md={9} className='d-flex flex-column'>
                                        <Card.Body>
                                            <Card.Title>
                                                {movie.Title}
                                            </Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col>Director: </Col>
                                                    <Col>{movie.Director.Name}</Col>
                                                </Row>
                                                <Row>
                                                    <Col>Genre:</Col>
                                                    <Col>{movie.Genre.Name}</Col>
                                                </Row>
                                                <Row>
                                                    <Col>Description:</Col>
                                                    <Col>{movie.Description}</Col>
                                                </Row>
                                            </Card.Text>
                                            
                                        </Card.Body>
                                    </Col>
                                </Row>
                                <Row className='d-flex flex-row justify-content-between mt-auto mb-md-4'>
                                    <Col>
                                        <Link to={`/`}>
                                            <Button variant='secondary' size='lg'>
                                                Back
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Button
                                            className="button-add-favorite"
                                            onClick={addFavoriteMovies}
                                            disabled={movieExists}
                                        >
                                            Add to Favorites
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={removeFavoriteMovie}
                                            disabled={disableRemove}
                                        >
                                            Remove from Favorites
                                        </Button>
                                    </Col>
                                </Row>                                
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <h2 className='mt-0'>
                                Similar movies
                            </h2>
                            <hr />
                            {similarMovies.map((movie) => (
                                <Col className='mb-5' key={movie.Title} xs={12} sm={6} md={4} lg={3}>
                                    <MovieCard
                                        movie={movie}
                                    />
                                </Col>
                            ))}
                        </Row>
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