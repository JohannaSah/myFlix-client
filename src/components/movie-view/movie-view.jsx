import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({movie, onBackClick}) => {        
        return (
            <div className="movie-view">
                <div className="movie-image">
                    <img src={movie.imageUrl} alt="image" className="w-100" />
                </div>
                <div className="movie-title">
                    <span> Title: </span>
                    <span>{movie.Title}</span>
                </div>
                <div className="movie-director">
                    <span> Director: </span>
                    <span>{movie.Director.Name}</span>
                </div>
                <div className="movie-genre">
                    <span> Genre: </span>
                    <span>{movie.Genre.Name}</span>
                </div>
                <div className="movie-description">
                    <span> Description: </span>
                    <span>{movie.Description}</span>
                </div>
                <button 
                    onClick={() => { onBackClick(null); }} 
                    className="back-button"
                    style={{cursor: "pointer"}}
                >
                    Back
                </button>
            </div>
        );
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