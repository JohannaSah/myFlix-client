import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      fetch("https://movieapi-dcj2.onrender.com/movies")
      .then((response) => response.json())
      .then((movie) => {
        const moviesFromApi = movie.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            description: movie.Description,
            image: movie.imageUrl,
            genre: movie.Genre.Name
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

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken: null);

    useEffect(() => {
      if (!token) {
        return;
      }

      fetch("https://movieapi-dcj2.onrender.com/movies", {
        headers: { Authorization: 'Bearer ${token}'}
      })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
    }, [token]);

    if (!user) {
      return (
        <>
          <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
        </>
      );
    }

    return (
      <div className="main-view">
        <div className="movie-display">
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
        <button onClick={() => {setUser(null); setToken(null); localStorage.clear(); }}>
          Log out
        </button>
      </div>
    );
  }
