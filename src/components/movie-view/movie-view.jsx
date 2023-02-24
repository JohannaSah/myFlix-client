import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from 'react-router';
import { Button, Row, Col, Card, Container, Collapse } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { toast } from 'react-toastify';

export const MovieView = ({movies, username, FavoriteMovies}) => {     
    
    const { Title } = useParams();
    const movie = movies.find((movie) => movie.Title === Title ); 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem('token');
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
            setUserFavoriteMovies(response.FavoriteMovies || userFavoriteMovies)
            if (response) {
                toast.success("Movie added to Favorites!");
                localStorage.setItem("user", JSON.stringify (response));
                window.location.reload();
            } else {
                toast.error("Something went wrong");
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
                toast.success("Movie removed from Favorites");
                localStorage.setItem("user", JSON.stringify (response))
                window.location.reload();

            } else {
                toast.error("Something went wrong");
            }
        });
    };

    const isFavorite = () => {
        return userFavoriteMovies.some((i) => i === movie._id);
    };

    const [openDirector, setOpenDirector] = useState(false);
    const [openGenre, setOpenGenre] = useState(false);

    return (
        <Container>
            {movies.length === 0 ? (
                <Col>
                    This list is empty!
                </Col>
            ) : (
                <>
                    <Card 
                        className="h-100 movieView mb-4 bg-dark border-1 border-light"
                    > 
                        <Row className='mb-4'>
                            <Col 
                                className='text-center'
                            >
                            <Card.Img 
                                variant="top" 
                                src={movie.imageUrl}
                                className='img-fluid w-100 h-auto movie-view-img'
                            />
                            </Col>
                        </Row>
                        <Card.Body className="mb-4">
                            <Card.Title 
                                className="mb-4 text-center movieViewTitle" 
                                style={{color: "whitesmoke"}}
                            >
                                <h1>{movie.Title}</h1>
                            </Card.Title>
                            <Card.Text className="mb-4" 
                                style={{color: "whitesmoke"}}>
                                <Row className="mb-4 movieViewDescription text-center">
                                    <Col>{movie.Description}</Col>
                                </Row>
                                <Row 
                                    className="movieViewDirector text-center mb-2"
                                    onClick={() => setOpenDirector(!openDirector)}
                                >
                                    <span>Director:</span> 
                                    <span style={{textDecoration: "underline", cursor: "pointer"}}> 
                                        {movie.Director.Name} 
                                    </span>                                  
                                    
                                    <Collapse in={openDirector}>
                                        <Col>{movie.Director.Bio}</Col>
                                    </Collapse>                                    
                                </Row>
                                <Row 
                                    className="movieViewGenre text-center mb-2"
                                    onClick={() => setOpenGenre(!openGenre)}
                                >
                                    <span>Genre:</span>
                                    <span style={{textDecoration: "underline", cursor: "pointer"}}>
                                        {movie.Genre.Name}
                                    </span>
                                    <Collapse in={openGenre}>
                                        <Col>{movie.Genre.Description}</Col>
                                    </Collapse>
                                </Row>                                
                            </Card.Text>
                            <Row className="mb-4 movieViewButtons text-center">
                                <Col>
                                    <Button
                                        variant="outline-light"
                                        onClick={() => addFavoriteMovies(movie._id)}
                                        disabled={isFavorite(movie._id)}
                                    >
                                        Add to Favorites
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant="outline-light"
                                        onClick={() => removeFavoriteMovie(movie._id)}
                                        disabled={isFavorite(movie._id) == false}
                                    >
                                        Remove from Favorites
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>                          
                    </Card>
                    <Card className="h-100 similarMovieView mb-4 bg-dark border-1 border-light">
                        <Card.Body>
                        <Row>
                            <Card.Title 
                                className='text-center h4 mb-4 mt-4 fw-bolder' 
                                style={{color: "whitesmoke"}}
                            >
                                <h1>Movies with the same genre</h1>
                            </Card.Title>
                                {similarMovies.map((movie) => (
                                    <Col className='mb-4' key={movie.Title} md={4}>
                                        <MovieCard
                                            movie={movie}
                                        />
                                    </Col>
                                ))} 
                        </Row>   
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