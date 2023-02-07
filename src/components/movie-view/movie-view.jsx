import React from "react";
import PropTypes from "prop-types";

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick} = this.props;
        
        return (
            <div className="movie-view">
                <div className="movie-image">
                    <img src="movie.imageUrl" alt="image" width ={"100px"} height={"100px"} />
                </div>
                <div className="movie-title">
                    <span> Title: </span>
                    <span>{movie.title}</span>
                </div>
                <div className="movie-director">
                    <span> Director: </span>
                    <span>{movie.director.name}</span>
                </div>
                <div className="movie-genre">
                    <span> Genre: </span>
                    <span>{movie.genre.name}</span>
                </div>
                <div className="movie-description">
                    <span> Description: </span>
                    <span>{movie.description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      }),
      director: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      imageUrl: PropTypes.string.isRequired
    }).isRequired,
  };