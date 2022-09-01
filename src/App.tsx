import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Character from "./routes/Character";
import Characters from "./routes/Characters";
import {
  ICharacter,
  defaultChar,
  ICharacters,
  defaultChars,
} from "./types/characters";
import IFormData, { ISens } from "./types/formData";

function App() {
  const [characters, setCharacters] = useState<ICharacters>(defaultChars);
  const [character, setCharacter] = useState<ICharacter>(defaultChar);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    alive: "",
  });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}&name=${formData.name}&status=${formData.alive}`
      )
        .then((res) => {if (res.ok) {
          return res.json();
        } else {
          throw new Error("Nothing to see here");
        }})
        .then((data) => data.error ? setCharacters({...defaultChars}) : setCharacters(data));
      console.log(characters);
      navigate("/characters");
    } 
    catch (error) {
      console.log(error);
      setCharacters(defaultChars);
      setPage(1)
    }
  }, [page]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      fetch(
        `https://rickandmortyapi.com/api/character/?page=1&name=${formData.name}&status=${formData.alive}`
      )
        .then((res: Response) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Nothing to see here");
          }
        })
        .then((data) => data.error ? setCharacters(defaultChars) : setCharacters(data));
      console.log(characters);
      setPage(1);
    } catch (error) {
      console.log(error);
      setCharacters(defaultChars);
    }
  };

  const getCharacter = (charId: number) => {
    if (charId) {
      try {
        fetch(`https://rickandmortyapi.com/api/character/${charId}`)
          .then((res) => res.json())
          .then((data) => setCharacter(data));

        navigate(`characters/${charId}`);
      } catch {
        (error: any) => <h2>{error}</h2>;
      }
    }
  };

  const changePage = (sens: ISens, pageNum: number = 1) => {
    if (sens === "increment") {
      setPage((prev) => prev + 1);
    } else if (sens === "decrement") {
      setPage((prev) => prev - 1);
    } else if (sens === "equal") {
      setPage(pageNum);
    } else {
      alert("Page unknown");
    }
  };

  return (
    <>
      <h1>Rick & Morty</h1>

      <Routes>
        <Route
          path="/characters/*"
          element={
            <Characters
              characters={characters.results}
              getCharacter={getCharacter}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              formData={formData}
              page={page}
              changePage={changePage}
              info={characters.info}
            />
          }
        />
        <Route
          path="/characters/:id"
          element={<Character character={character} />}
        />
      </Routes>
      <div className="App"></div>
    </>
  );
}

export default App;
