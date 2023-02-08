import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://movieapi-dcj2.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if(data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                }
                else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                console.log(e, "error");
                alert("Something went wrong");
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group
                controlId="formLoginUsername"
            >
                <Form.Label>
                    Username:
                </Form.Label>
                <Form.Control
                    placeholder="Enter your username"
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="3"
                    required
                />
            </Form.Group>

            <Form.Group
                controlId="formLoginPassword"
            >
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control 
                    placeholder="Enter your password"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };
  
  export default LoginView;