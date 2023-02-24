import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
    return (
        <Container className="mb-4" bg="dark" expand="lg">
            <Row>
                <Col 
                    className="mb-4 text-center" 
                    style={{color: "whitesmoke", marginTop: "50px"}}
                >
                    Thanks for using myFlix 
                    <br />
                    Unfortunately it might take a little while to load
                    <br />
                    Thank you for for patience and understanding 

                </Col>
            </Row>
        </Container>
    )
};

export default Footer;