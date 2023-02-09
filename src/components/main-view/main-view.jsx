import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    // const [selectedMovie, setSelectedMovie] = useState(null); Is it correct to delete this?
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
                        <MovieView movies={movies} />
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
                    ) : movies.length === 0 ? (
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


        {/** is the Logout button correct???  */}
        <Row className="justify-content-md-center"> 
          <Col md={2}>
            <Button
              onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
          
      </BrowserRouter>
    );
  };
