import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

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
    const [token, setToken] = useState(null);

    useEffect(() => {
      if (!token) {
        return;
      }

      fetch("https://movieapi-dcj2.onrender.com/", {
        headers: { Authorization: 'Bearer ${token}'}
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    }, [token]);

    if (!user) {
      return (
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      );
    }

    return (
      <div className="main-view">
        <div className="movie-dsiplay">
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
        <button onClick={() => {setUser(null); setToken(null); }}>
          Log out
        </button>
      </div>
    );
};
