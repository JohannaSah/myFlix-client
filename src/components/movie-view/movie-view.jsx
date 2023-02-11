import React from "react";
import PropTypes from "prop-types";
import { useParams } from 'react-router';
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({movies}) => {     
    
    const { movieTitle } = useParams();
    const movie = movies.find((movie) => movie.Title === movieTitle ); 

    let similarMovies = movies.filter((filteredMovie) => {
        return (
          filteredMovie.Genre.Name === movie.Genre.Name &&
          filteredMovie.Title !== movie.Title
        );
      });
    
    return (
        <>
            {movies.length === 0 ? (
                <Col>
                    This list is empty!
                </Col>
            ) : (
                <> 
                    <Row className='d-flex flex-row-reverse p-3'>
                        <Col md={5} className='text-center text-md-end'>
                            <img
                                src={movie.image}
                                alt={`Poster for ${movie.title}`}
                                className='img-fluid h-100 w-auto movie-view-img'
                            />
                        </Col>
                        <Col md={7} className='d-flex flex-column'>
                            <Row className='d-flex flex-row  justify-content-between'>
                                <Col md={9} className='d-flex flex-column'>
                                <h3 className='my-0'>
                                    <span>Title: </span>
                                    <span>{movie.Title}</span>
                                </h3>
                                <h5>
                                    <span>Director: </span>
                                    <span>{movie.Director}</span>
                                </h5>
                                </Col>
                                <Col md={3} className='align-self-end mb-2 text-end'>
                                    <span>Genre:</span>
                                    <span>{movie.Genre.Name}</span>
                                </Col>
                            </Row>
                            <div className='mt-md-5 mb-4'>
                                <div className='text-decoration-underline mb-2'>
                                Description:{' '}
                                </div>
                                <span>{movie.description}</span>
                            </div>
                            <Row className='d-flex flex-row justify-content-between mt-auto mb-md-4'>
                                <Col className='text-end'>
                                    <Link to={`/`}>
                                        <Button variant='secondary' size='lg'>
                                            Back
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>                                
                        </Col>
                    </Row>
                    <Row>
                        <h2 className='mt-0'>
                            Similar movies
                        </h2>
                        <hr />
                        {similarMovies.map((movie) => (
                            <Col className='mb-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
                                <MovieCard
                                    movie={movie}
                                />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    )
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      imageUrl: PropTypes.string
    }).isRequired,
  };