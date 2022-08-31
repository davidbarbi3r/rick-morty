import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import ICharacter from "./types/characters";
import IFormData from "./types/formData";

function App() {
  const [characters, setCharacters] = useState<ICharacter[]>();
  const [character, setCharacter] = useState<ICharacter>();
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    alive: "",
  });
  const [page, setPage] = useState(1)
  console.log(page)

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
        `https://rickandmortyapi.com/api/character/?name=${formData.name}&status=${formData.alive}`
      )
        .then((res) => res.json())
        .then((data) => setCharacters(data.results));
    }
    catch {
      (error: any) => <h2>{error}</h2>
    }
  };

  const getCharacter = (charId: number) => {
    if (charId) {
      try {
        fetch(`https://rickandmortyapi.com/api/character/${charId}`)
          .then((res) => res.json())
          .then((data) => setCharacter(data));
      } catch {
        (error: any) => <h2>{error}</h2>;
      }
    }
  };

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
  }, [page]);

  const CharacterHtml = characters
    ? characters.map((char) => (
        <button key={char.id} onClick={() => getCharacter(char.id)}>
          <img src={char.image} alt={char.name}></img>
          <div>{char.name}</div>
        </button>
      ))
    : "";

  const DisplayHtml = character 
    ? <div>
      <button>Return</button>
      <div className="Character">
        <h2>{character.name}</h2>
        <h3>{character.status}</h3>
        <img src={character.image} alt={character.name}/>
      </div>
    </div> : CharacterHtml

  return (
    <div className="App">
      <h1>Rick & Morty</h1>
      <div>
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      </div>
      <div className="Container">
        {DisplayHtml}
      </div>
      <div className="Pages">
        <button disabled={page === 1} onClick={() => setPage(prev => prev-1)}>Prev page</button>
        <h3>page: {page}</h3>
        <button onClick={() => setPage(prev => prev+1)}>Next page</button>
      </div>
    </div>
  );
}

export default App;
