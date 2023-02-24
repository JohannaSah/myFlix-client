import React, { useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

export const FavMovies = ({ movies, storedUser }) => {
    const [user, setUser] = useState(storedUser ? storedUser : null);
    let favoriteMovies = movies.filter((movie) => 
        user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)
    );

    return (
        <Container>
            <Card className="h-100 mb-4" bg="light">
                <Card.Body>
                    <Row>
                        {favoriteMovies.length === 0 ? ( 
                            <Card.Body>
                                <Card.Title className="text-start h4 mb-4 mt-4 fw-bolder">
                                    <h1>Favorite Movies</h1>
                                </Card.Title>
                                <Card.Body>
                                    You have not added any favorite movies yet
                                </Card.Body>
                                </Card.Body>
                        ) : (
                            <>
                                <Card.Title className="mb-4 mt-4">
                                    <h1>Favorite Movies</h1>
                                </Card.Title>
                                    {favoriteMovies.map((movie) => (
                                        <Col className="mb-5" key={movie._id} md={4}>
                                            <MovieCard
                                                movie={movie}
                                            />
                                        </Col>
                                    ))}                                                         
                            </>
                        )}
                    </Row>
                </Card.Body>                
            </Card>
        </Container>
    );
};