import React from "react";
import PropTypes from "prop-types";

export class MovieView extends React.Component {
    
    render () {
        const { movie, onBackClick} = this.props;

        return (
            <div className="movie-view">
                <div className="movie-image">
                    <img src="movie.imageUrl" alt="" />
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
                    <span> Description </span>
                    <span>{movie.Description}</span>
                </div>
                <button onClick={onBackClick}>Back</button>
            </div>
        );
    }
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
      imageUrl: PropTypes.string.isRequired
    }).isRequired,
  };