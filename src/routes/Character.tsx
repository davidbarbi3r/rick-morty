import React from "react";
import ICharacter from "../types/characters";
import { useNavigate } from "react-router-dom";

const Character = (props: ICharacter) => {
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
  } = props;

  return (
    <div>
      <button onClick={() => navigate("/characters")}>Return</button>
      <div className="Character">
        <h2>{name}</h2>
        <h3>{status}</h3>
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default Character;
