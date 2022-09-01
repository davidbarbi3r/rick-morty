export interface ICharacters {
  info : IInfo
  results: ICharacter[]
}

export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: OriginOrLocation;
    location: OriginOrLocation;
    image: string;
    episode?: (string)[] | null;
    url: string;
    created: string;
  }

  interface OriginOrLocation {
    name: string;
    url: string;
  }

  export interface IInfo {
    count: number
    pages: number
    next: string | null
    prev: string | null
}
  
  export const defaultChars: ICharacters = {
    info: {
      count: 1,
      pages: 1,
      next: "",
      prev: ""
  },
    results: [{
      id: 0,
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      origin: {name: "", url: ""},
      location: {name: "", url: ""},
      image: "",
      url: "",
      created: ""
    }]
  }

  export const defaultChar: ICharacter = {
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {name: "", url: ""},
    location: {name: "", url: ""},
    image: "",
    url: "",
    created: ""
  }