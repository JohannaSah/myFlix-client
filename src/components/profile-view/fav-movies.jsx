import React, { useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

export const FavMovies = ({ movies, storedUser }) => {
    const [user, setUser] = useState(storedUser ? storedUser : null);
    let favoriteMovies = movies.filter((movie) => 
        user.FavoriteMovies.includes(movie.Title)
    );

    return (
        <Container>
            <Card className="h-100" bg="light">
                <Row>
                    {favoriteMovies.length === 0 ? (
                    <Col className="d-flex flex-column flex-lg-row ms-2 text-lg-left mt-lg-3 mt-3">
                        <Card.Title>
                            Favorite Movies
                        </Card.Title>
                    </Col>
                    ) : (
                        <>
                            <Card.Title className="text-start h4 mb-4">
                                List of favorite Movies
                            </Card.Title>
                            {favoriteMovies.map((movie) => (
                                <Col className="mb-5" key={movie.Title} xs={12} sm={6} md={4} lg={3}>
                                    <MovieCard
                                        movie={movie}
                                    />
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Card>
        </Container>
    );
};