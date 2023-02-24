import React from "react";
import { UpdateForm } from "./update-form";
import { FavMovies } from "./fav-movies";


export const ProfileView = ({ movies }) => {
    const storedToken = localStorage.getItem("token");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <UpdateForm storedToken={storedToken} storedUser={storedUser} />
            <FavMovies movies={movies} storedUser={storedUser} />
        </>
    );
};