import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
      fetch("https://movieapi-dcj2.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            director: doc.Director.Name,
            description: doc.Description,
            image: doc.imageUrl,
            genre: doc.Genre.Name
          };
        });

        setMovies(moviesFromApi);
        console.log('movies from Api:', data);
      });
    }, []);
    
    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView 
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div className="main-view"> The list empty! </div>;
    }

    return (
        <div className="main-view">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
