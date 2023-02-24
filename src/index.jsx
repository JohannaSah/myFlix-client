import React from "react";
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import statement to indicate that 'index.scss' needs to be bundled
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <>
            <Container className="bg-dark" expand="lg">
                <MainView/>
            </Container>
            <ToastContainer />
        </>
        
    );
};

// Find the root of the app
const container = document.querySelector("#root"),
    root = createRoot(container);

// Tells React to render the app on the root DOM element
root.render(<MyFlixApplication/>);