import React, { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };

        fetch("https://movieapi-dcj2.onrender.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successfull");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="signup-username">
                Username:
                    <input 
                        type="text" 
                        value={ username }
                        onChange={(error) => setUsername(error.target.value)}
                        required
                        minLength="3"
                    />
            </label>
            <label className="signup-password">
                Password: 
                    <input 
                        type="password" 
                        value={ password }
                        onChange={(error) => setPassword(error.target.value)}
                        required
                    />
            </label>
            <label className="signup-email">
                Email: 
                    <input 
                        type="email"
                        value= { email }
                        onChange={(error) => setEmail(error.target.value)}
                        required
                    />
            </label>
            <label className="signup-birthday">
                Birthday:
                    <input 
                        type="date"
                        value={ birthday }
                        onChange={(error) => setBirthday(error.target.value)}
                        required
                    />
            </label>
            <button type="submit"> 
                Submit
            </button>
        </form>
    );
};