import React from "react";

export const MovieCard = ({movie, onMovieClick}) => {
    render(); {
        const { movie, onMovieCLick } = this.props;

        return (
            <div 
                className="movie-card"
                onClick={() => {
                    onMovieClick(movie);
            }}>
                {movie.title}
            </div>
        );
    };
};

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};