import CharacterCard from "../components/CharacterCard";
import Form from "../components/Form";
import {ICharacter, IInfo} from "../types/characters";
import IFormData, { ISens } from "../types/formData";

interface ICharactersProps {
  characters: ICharacter[];
  getCharacter: (charId: number) => void;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  formData: IFormData;
  page: number;
  changePage: (sens: ISens, pageNum?: number) => void;
  info: IInfo;
}

const Characters = ({
  characters,
  getCharacter,
  handleChange,
  handleSubmit,
  formData,
  page,
  changePage,
  info,
}: ICharactersProps) => {
  const CharacterHtml = characters.map((char) => (
    <CharacterCard key={char.id} char={char} getCharacter={getCharacter} />
  ));

  return (
    <>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <div className="Container">
        {CharacterHtml}
      </div>
      <div className="Container">
        <div className="Pages">
          <button 
            className="Std-btn" 
            disabled={page === 1} 
            onClick={() => changePage("decrement")}
          >
            Prev page
          </button>
          <h3>page: {page}</h3>
          <button 
            className="Std-btn"
            disabled={info.pages === page}
            onClick={() => changePage("increment")}
          >
            Next page
          </button>
        </div>
      </div>
    </>
  );
};

export default Characters;
