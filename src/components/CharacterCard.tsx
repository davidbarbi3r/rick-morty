import {ICharacter} from '../types/characters'

interface ICharacterCard {
    char: ICharacter
    getCharacter: (charId: number) => void
}

const CharacterCard = (props: ICharacterCard) => {
    const {id, image, name} = props.char
  
    return (
    <button key={id} onClick={() => props.getCharacter(id)}>
          <img src={image} alt={name}></img>
          <div>{name}</div>
        </button>
  )
}

export default CharacterCard