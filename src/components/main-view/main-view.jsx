import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken: null);

// I do not know how to  connect the 2 useEffect, but I believe they should be 1 
// also the if statements should be included in the useEffect but I do not know how at this time
    useEffect(() => {
      if (!token) {
        return;
      }
      fetch("https://movieapi-dcj2.onrender.com/movies", {
        headers: { Authorization: 'Bearer ${token}'}
      })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
        setMovies(movies);
      });
    }, [token]);

    if (selectedMovie) {
        return (
            <MovieView 
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} />
        );
    }

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

    if (movies.length === 0) {
        return <div className="main-view"> The list empty! </div>;
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
