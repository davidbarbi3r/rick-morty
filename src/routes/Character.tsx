import React from "react";
import {ICharacter} from "../types/characters";
import { generatePath, useNavigate } from "react-router-dom";

interface ICharacterProps {
  character: ICharacter 
}

const Character = (props: ICharacterProps) => {
  const navigate = useNavigate()

  const {
    id,
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode,
    url,
    created,
  } = props.character;

  const charEp = episode ? episode.map((ep) => <li>{ep.slice(32)}</li>) : ""

  return (
    <div className="CharacterCard">
      <button className="Std-btn" onClick={() => navigate(-1)}>Return</button>
      <div className="Character">
        <img src={image} alt={name} />
        <div className="CharDescription">
          <h2>Name: {name}</h2>
          <p>Status: {status}</p>
          <p>Species: {species}</p>
          <p>{type? "Type: " + type: ""}</p>
          <p>Genre: {gender === 'Male' ? "👨🏻" : gender === "Female" ? "👩🏻" : "☢"}</p>
          <p>Origin: {origin.name} Location: {location.name}</p>
          <ul>{charEp}</ul>
        </div>
        
      </div>
    </div>
  );
};

export default Character;
