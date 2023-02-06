import React from "react";

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick} = this.props;
        
        return (
            <div className="movie-view">
                <div className="movie-poster">
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
                    <span> Description: </span>
                    <span>{movie.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}
