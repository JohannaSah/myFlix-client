import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [FavoriteMovies] = useState([]);

    useEffect(() => {
      if (!token) {
        return;
      }
      fetch("https://movieapi-dcj2.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
        setMovies(movies);
      });
    }, [token]);

    return (
      <BrowserRouter>
        <NavigationBar 
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
        <Row className="justify-content-md-center">
          <Routes>
            <Route 
              path="/signup"
              element={
                <>
                  {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )
                  }
                </>
              }
            />
            <Route 
              path="/login"
              element={
                <>
                  {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView 
                          onLoggedIn={(user) => {
                            setUser(user);
                            setToken(token);
                          }}
                        />
                      </Col>
                    )
                  }
                </>
              }
            />
            <Route 
              path="/movies/:Title" 
              element={
                <>
                  {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>
                        The list is empty!
                      </Col>
                    ) : (
                      <Col md={8}>
                        <MovieView 
                          movies={movies} 
                          username={user.Username} 
                          favoriteMovies={user.FavoriteMovies}
                        />
                      </Col>
                    )
                  }
                </>
              }
            />
            <Route 
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                    ) : (
                      <Col md={8}>
                        <ProfileView user={user} movies={movies} />
                      </Col>
                    )
                  }
                </>
              }
            />
            <Route 
              path="/"
              element={
                <>
                  {!user ? (
                      <Navigate to="/login" replace />
                    ) : (movies && movies.length === 0) ? (
                      <Col> 
                        This list is empty! 
                      </Col>
                    ) : (
                      <>
                        {movies.map((movie) => (
                          <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </>
                    )
                  }
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };
