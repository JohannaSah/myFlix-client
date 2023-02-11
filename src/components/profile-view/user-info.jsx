import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";


export const UserInfo = ({user}) => {

    return (
        <Container>
            <Card bg="light" className="mb-4">
                <Card.Title className="d-flex flex-column flex-lg-row ms-2 text-lg-left mt-lg-3 mt-3">
                    Your Profile
                </Card.Title>
                <Card.Body>
                    <Row className="d-flex flex-column flex-lg-row ms-2 text-lg-left mt-lg-3 mt-3">
                        <Col>
                            <span>Username: </span>
                            <span className="fw-bolder">{user.Username}</span>
                        </Col>
                    </Row>
                    <Row className="d-flex flex-column flex-lg-row ms-2 text-lg-left mt-lg-3 mt-3">
                        <Col>
                            <span>Email: </span>
                            <span className="fw-bolder">{user.Email}</span>
                        </Col>
                    </Row>
                    <Row className="d-flex flex-column flex-lg-row ms-2 text-lg-left mt-lg-3 mt-3">
                        <Col>
                            <span>Birthday: </span>
                            <span className="fw-bolder">{user.Birthday}</span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}