import React from 'react';
import {Link} from 'react-router-dom';

export default function PokemonList({ pokemon }) {
    return (
        <ul className="pokemonList">
            {pokemon.map(p => (
                <li key={p.name}>
                    <Link style={{}} to={"/pokemonInfo/"+p.url.substring(34,p.url.length-1)} className="pokemonName" key={p.name}>{p.name.charAt(0).toUpperCase()+p.name.substring(1)}</Link>
                </li>
            ))}
        </ul>
    )
}
