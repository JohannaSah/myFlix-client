import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactLoadingSkeleton from 'react-loading-skeleton';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Footer } from "../footer/footer";
import { ProfileView } from "../profile-view/profile-view";
import { MovieCardLoader } from "../loading-skeletons/movie-card-loader";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [FavoriteMovies] = useState([]);
    const [searchedInfo, setSearchedInfo] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!token) {
        return;
      }
      setLoading(true);
      fetch("https://movieapi-dcj2.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      });
    }, [token]);

    useEffect(() => {
      if (searchedInfo && searchedInfo.length > 0) {
        const searchedMovies = movies.filter( m => (
          m.Title.toLowerCase().includes(searchedInfo.toLowerCase().trim()) ||
          m.Genre.Name.toLowerCase().includes(searchedInfo.toLowerCase().trim()) ||
          m.Director.Name.toLowerCase().includes(searchedInfo.toLowerCase().trim())
        ));
        setFilteredMovies(searchedMovies);
      }
      else {
        setFilteredMovies([]);
      }
    }, [searchedInfo])

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
        <Row className="justify-content-md-center bg-dark">
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
                          onLoggedIn={(user, token) => {
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
                ) : loading ? (
                  <MovieCardLoader/>
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      username={user.Username}
                      favoriteMovies={user.FavoriteMovies}
                    />
                  </Col>
                )}
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
                        <ProfileView 
                          user={user} 
                          movies={movies} 
                          favoriteMovies={user.FavoriteMovies}
                        />
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
                  <Row className="mb-4">
                    <Col>
                      <Form>
                        <Form.Control 
                          type="text"
                          placeholder="Search by Title, Genre, or Director"
                          value={searchedInfo}
                          onChange={e => setSearchedInfo(e.target.value)}
                          className="bg-light"
                        />
                      </Form>
                    </Col>
                  </Row>
                  {!user ? (
                    <Navigate to="/login" replace />
                    ) : (
                      loading ? (
                        <Row>
                          {[1,2,3,4,5,6].map((n) => (
                            <Col className="mb-4" key={n} md={4}>
                              <ReactLoadingSkeleton height={250} />
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <>
                          {filteredMovies && filteredMovies.length > 0 ? (
                            filteredMovies.map((movie) =>                            
                              <Col className="mb-4" key={movie.id} md={4}>                              
                                  <MovieCard movie={movie} user={user}/>                               
                              </Col>                                                         
                            )
                          ) : (
                            movies.map((movie) => (                            
                              <Col className="mb-4" key={movie.id} md={4}>                              
                                  <MovieCard movie={movie} user={user}/>                              
                              </Col>                            
                            ))
                          )}
                        </>
                      )
                  )}
                </>
              }
            />
          </Routes>
        </Row>
        <Footer />
      </BrowserRouter>
    );
  };
