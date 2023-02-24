import React from "react"; 
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({user, onLoggedOut}) => {
    return (
        <Navbar className="mb-4" bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <h1>MyFlix</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <h2>Login</h2>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    <h2>Signup</h2>
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    <h2>Home</h2>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    <h2>Profile</h2>
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    <h2>Logout</h2>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};