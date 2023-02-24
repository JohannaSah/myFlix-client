import React, { useState } from "react";
import { Form, Button, Col, Row, Card, Container } from "react-bootstrap";
import { toast } from 'react-toastify';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://movieapi-dcj2.onrender.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response)
            if (response.ok) {
                console.log("Response is ok");
                toast.success("Signup successfull");
                window.location.href = '../login';
            } else {
                toast.error("Signup failed");
            }
        });
    };

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md={8}>
                    <div 
                        className='mt-5 text-center text-muted'
                    >
                        <h3>Sign up for</h3>
                    </div>
                    <h1 
                        className='text-center font-weight-bold mb-4' 
                        style={{color: "white"}}
                    >
                        MyFlix
                    </h1>
                </Col>
            </Row>
            <Row >
                <Col>                    
                    <Card className='border-0'> 
                        <Card.Body className="mt-4">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group
                                    controlId="formSignUpUsername" 
                                    className="formGroup mb-2"                                   
                                >
                                    <Form.Label>
                                        Username:
                                    </Form.Label>
                                    <Form.Control 
                                        placeholder="Enter a username"
                                        type="text" 
                                        value={ username }
                                        onChange={(error) => setUsername(error.target.value)}
                                        required
                                        minLength="3"
                                    />
                                    <Form.Text className="text-muted">
                                        min. 5 characters
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group
                                    controlId="formSignupPassword"
                                    className="formGroup  mb-2"  
                                >
                                    <Form.Label>
                                        Password:
                                    </Form.Label>
                                    <Form.Control 
                                        placeholder="Enter a password"
                                        type="password" 
                                        value={ password }
                                        onChange={(error) => setPassword(error.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    controlId="formSignupEmail"
                                    className="formGroup  mb-2"  
                                >
                                    <Form.Label>
                                        Email:
                                    </Form.Label>
                                    <Form.Control 
                                        placeholder="Enter your email adress"
                                        type="email"
                                        value= { email }
                                        onChange={(error) => setEmail(error.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    controlId="formSignupBirthday"
                                    className="formGroup  mb-4"  
                                >
                                    <Form.Label>
                                        Birthday:
                                    </Form.Label>
                                    <Form.Control 
                                        type="date"
                                        value={ birthday }
                                        onChange={(error) => setBirthday(error.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button 
                                    type="submit" 
                                    variant="dark"
                                    className="mb-4 "
                                > 
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>  
    );
};