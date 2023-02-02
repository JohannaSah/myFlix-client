export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src="movie.imageUrl" alt="" />
            </div>
            <div>
                <span> Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span> Director: </span>
                <span>{movie.director.name}</span>
            </div>
            <div>
                <span> Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};