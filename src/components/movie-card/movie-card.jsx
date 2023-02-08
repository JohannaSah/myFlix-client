import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
        return (
            <div 
                className="movie-card"
                onClick={() => {
                    onMovieClick(movie);
            }}>
                {movie.Title}
            </div>
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