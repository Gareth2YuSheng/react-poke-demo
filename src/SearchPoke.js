import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchPoke() {
    const [searchParams, setSearchParams] = useState("");
    const history = useHistory();

    function search() {
        console.log(searchParams);
        history.push("/pokemonInfo/"+searchParams.toLowerCase());
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            search();
        }
    }

    return (
        <div id="search">
            <input className="searchBar" type="text" placeholder="Search for Pokemon by name or Pokedex no. (e.g. Ditto or 132)" onChange={(e) => setSearchParams(e.target.value)} onKeyUp={handleKeyPress}  />
            <button className="searchButton" onClick={search} type="submit"><i className="fa fa-search"></i></button>                        
        </div> 
    )
}
