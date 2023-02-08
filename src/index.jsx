import React from "react";
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import React from 'react';

// Import tatement to indicate that 'index.scss' needs to be bundled
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return <MainView/>;
};

// Find the root of the app
const container = document.querySelector("#root"),
    root = createRoot(container);

// Tells React to render the app on the root DOM element
root.render(<MyFlixApplication/>);