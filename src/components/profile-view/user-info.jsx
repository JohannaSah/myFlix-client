import React from "react";
import moment from "moment";
import { Row, Col, Container, Card } from "react-bootstrap";


export const UserInfo = ({user}) => {

    return (
        <Container>
            <Card bg="light" className="mb-4 mt-4 ml-4 mr-4 ">
                <Card.Body>
                    <Card.Title className="mb-4 mt-2 ml-4 mr-4 fw-bolder">
                        Your Profile
                    </Card.Title>
                    <Row className="mb-4 ml-4 mr-4">
                        <Col>
                            <span>Username: </span>
                            <span className="fw-bolder">{user.Username}</span>
                        </Col>
                    </Row>
                    <Row className="mb-4 ml-4 mr-4">
                        <Col>
                            <span>Email: </span>
                            <span className="fw-bolder">{user.Email}</span>
                        </Col>
                    </Row>
                    <Row className="mb-4 ml-4 mr-43">
                        <Col>
                            <span>Birthday: </span>
                            <span className="fw-bolder">{moment(user.Birthday).format("YYYY-MM-DD")}</span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}