
import { createRoot } from 'react-dom/client';

// Import tatement to indicate that 'index.scss' needs to be bundled
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <div className='my-flix'>
            <div> Good morning </div>
        </div>
    );
};

// Find the root of the app
const container = document.querySelector("#root"),
    root = createRoot(container);

// Tells React to render the app on the root DOM element
root.render(<MyFlixApplication/>);