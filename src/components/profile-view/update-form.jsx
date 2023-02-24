import React from "react";
import { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import moment from "moment";

export const UpdateForm =({ storedToken, storedUser}) => {
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const updateUser = username => {
        const formData = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        }
        fetch(`https://movieapi-dcj2.onrender.com/users/${username}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(response => response.json())
          .then(response => {
            console.log('Success: ', response)
    
            console.log(response, 'response')
            setUser(response)
            localStorage.setItem('user', JSON.stringify(response))
            window.location.reload()
          })
          .catch(error => {
            console.log(error)
          })
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        fetch(
            `https://movieapi-dcj2.onrender.com/users/${storedUser.Username}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => {
            if (response.ok) {
                alert("Changes saved");
                updateUser(username);
            } else {
                alert("Something went wrong");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleDeleteUser = (username) => {
        const userWarning = confirm(
            `Are you sure? This action is permanent, if you delete your account it cannot be removed. Proceed?`
        );

        userWarning === false
            ? alert('Thank you for continuing to use myFlix')
        : fetch(`https://movieapi-dcj2.onrender.com/users/${username}`, {
            method: "DELETE",
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
        }).then(response => {
            if(response.ok) {
                alert("User was successfully deleted");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("User was not deleted");
            }
        });    
    };

    return (
        <Container>
            <Card className="mb-4 mt-4 ml-4 mr-4" bg="light">
            <Card.Body>
                    <Card.Title className="mb-4 mt-1 ml-4 mr-4">
                        <h1>User Info</h1>
                    </Card.Title>
                    <Card.Body>
                        <Form className="profile-form mb-4 ml-4 mr-4" onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username: </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    placeholder="Enter a username" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password: </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength="8"
                                    placeholder="Password must be 8 or more characters" 
                                />
                            </Form.Group> 
                            <Form.Group className="mb-3">
                                <Form.Label>E-mail: </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email address" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Birthday: </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={moment(birthday).format("YYYY-MM-DD")}
                                    onChange={e => setBirthday(e.target.value)}
                                    required
                                    placeholder="Enter your email address" 
                                />
                            </Form.Group>
                            <Row>
                                <Col md={3}>
                                    <Button variant="dark" type="submit" >
                                        Update Info
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button 
                                        onClick={() => handleDeleteUser(user.Username)}
                                        className="button-delete"
                                        type="submit"
                                        variant="danger"
                                    >
                                        Delete Account
                                    </Button> 
                                </Col>
                            </Row>                                                              
                        </Form>
                    </Card.Body>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default UpdateForm;