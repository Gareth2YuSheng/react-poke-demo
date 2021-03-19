import React, {useState, useEffect} from 'react'
import Pagination from './Pagination';
import axios from 'axios';
import './App.css';
import {Link} from 'react-router-dom';

export default function PokemonList() {
    const [pokemon, setPokemon] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [prevPageUrl, setPrevPageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => cancel=c)
        }).then(res => {
            setPokemon(res.data.results);
            setNextPageUrl(res.data.next);
            setPrevPageUrl(res.data.previous);
            setLoading(false);
        })

    return () => cancel();
    },[currentPageUrl])

    function nextPage() {
    setCurrentPageUrl(nextPageUrl);
    }

    function prevPage() {
    setCurrentPageUrl(prevPageUrl);
    }

    if (loading) return "Loading...";
    
    
    return (
        <div>
            <h2>Pokémon</h2>
            <ul className="pokemonList">
                {pokemon.map(p => (
                    <li>
                        <Link to={"/pokemonInfo/"+p.url.substring(34,p.url.length-1)} className="pokemonName" key={p.name}>{p.name.charAt(0).toUpperCase()+p.name.substring(1)}</Link>
                    </li>
                ))}
            </ul>
            <Pagination nextPage={nextPageUrl ? nextPage : null} prevPage={prevPageUrl ? prevPage : null} /> 
        </div>
    )
}
