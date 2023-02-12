import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";

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

    return (
      <>
        <Row className="justify-content-md-center">
        {!user ? (
              <Col md={5}>
                <LoginView 
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
                or
                <SignupView />
              </Col>
          ) : selectedMovie ? (
              <Col md={8} style={{ border: "1px solid" }}>
                <MovieView 
                  style={{ border: "1px solid" }}
                  movie={selectedMovie}
                  onBackClick={() => setSelectedMovie(null)}
                />              
              </Col>
          ) : movies.length === 0 ? (
              <div className="main-view"> 
                The list empty! 
              </div>
          ) : (
              <>
                {movies.map((movie) => (
                    <Col key={movie._id} className="mb-4" md={3}>
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                ))}
              </>
          )
        }
      </Row>
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
      </>
    );
  };
