import React from "react";

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieCLick } = this.props;

        return <div className="movie-card" onClick={() => {onMovieCLick(movie);}}>
            {movie.Title}
        </div>
    }
}