import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            "_id": {
              "$oid": "63ac5ae16252e54be0c264ad"
            },
            "Title": "Perks of being a Wallflower",
            "Director": {
              "Name": "Stephen Chbosky",
              "Bio": "Stephen Chbosky was born on January 25, 1970 in Pittsburgh, Pennsylvania, USA. He is a writer and producer, known for The Perks of Being a Wallflower (2012), Beauty and the Beast (2017) and Wonder (2017). He has been married to Liz Maccie since September 18, 2010. They have two children. ",
              "YearOfBirth": "1970",
              "YearOfDeath": ""
            },
            "Description": "An introvert freshman is taken under the wings of two seniors who welcome him to the real world.",
            "Genre": {
              "Name": "Drama",
              "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
            },
            "imageUrl": "https://www.imdb.com/title/tt1659337/mediaviewer/rm2134748161/?ref_=tt_ov_i",
            "Featured": true
        },
        {
            "_id": {
              "$oid": "63ac5af26252e54be0c264ae"
            },
            "Title": "The Intouchables",
            "Director": {
              "Name": [
                "Olivier Nakache",
                "Eric Toledano"
              ],
              "Bio": "O.N.: Olivier Nakache was born on April 15, 1973 in Suresnes, Hauts-de-Seine, France. He is a writer and producer, known for The Intouchables (2011), C'est la vie! (2017) and The Specials (2019). / E.T.: Éric Toledano was born on July 3, 1971 in Paris, France. He is a writer and producer, known for The Intouchables (2011), C'est la vie! (2017) and The Specials (2019).  ",
              "YearOfBirth": "O.N.: 1973, E.T.: 1971",
              "YearOfDeath": ""
            },
            "Description": "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver. ",
            "Genre": {
              "Name": "Biography",
              "Description": "A biographical film or biopic  is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used.[2] They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person's life story or at least the most historically important years of their lives."
            },
            "imageUrl": "https://www.imdb.com/title/tt1675434/mediaviewer/rm1305720576/?ref_=tt_ov_i",
            "Featured": true
        },
        {
            "_id": {
              "$oid": "63ac5af86252e54be0c264af"
            },
            "Title": "Goodbye Lenin",
            "Director": {
              "Name": "Wolfgang Becker",
              "Bio": "Wolfgang Becker was born on June 22, 1954 in Hemer, North Rhine-Westphalia, Germany. He is a director and writer, known for Good Bye Lenin! (2003), Fjärilar (1988) and Child's Play (1992).",
              "YearOfBirth": "1954 ",
              "YearOfDeath": ""
            },
            "Description": "In 1990, to protect his fragile mother from a fatal shock after a long coma, a young man must keep her from learning that her beloved nation of East Germany as she knew it has disappeared.",
            "Genre": {
              "Name": "Comedy",
              "Description": "A comedy film is a category of film which emphasizes humor.[1] These films are designed to make the audience laugh through amusement.[2] Films in this style traditionally have a happy ending (black comedy being an exception)."
            },
            "imageUrl": "https://www.imdb.com/title/tt0301357/mediaviewer/rm802921728/?ref_=tt_ov_i",
            "Featured": false
        },
        {
            "_id": {
              "$oid": "63ac5b006252e54be0c264b0"
            },
            "Title": "Life is beautiful",
            "Director": {
              "Name": "Roberto Benigni",
              "Bio": "Roberto Benigni was born on October 27, 1952 in Manciano La Misericordia, Castiglion Fiorentino, Tuscany, Italy. He is an actor and writer, known for Life Is Beautiful (1997), The Tiger and the Snow (2005) and Down by Law (1986). He has been married to Nicoletta Braschi since December 26, 1991. ",
              "YearOfBirth": "1952 ",
              "YearOfDeath": ""
            },
            "Description": "When an open-minded Jewish waiter and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp.",
            "Genre": {
              "Name": "Drama",
              "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
            },
            "imageUrl": "https://www.imdb.com/title/tt0118799/mediaviewer/rm2303464448/?ref_=tt_ov_i ",
            "Featured": true
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const [token, setToken] = useState(null);

    useEffect(() => {
      if (!token) {
        return;
      }

      fetch("https://movieapi-dcj2.onrender.com/", {
        headers: { Authorization: 'Bearer ${token}'}
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    }, [token]);

    if (!user) {
      return (
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      );
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null0)} />
        );
    }

    if (movies.length === 0) {
        return <div> The list empty! </div>;
    }

    return (
      <div>
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
        <button onClick={() => {setUser(null); setToken(null); }}>
          Log out
        </button>
      </div>
    );
};
