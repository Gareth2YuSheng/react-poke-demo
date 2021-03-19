import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

export default function PokemonInfo() {
    let { id } = useParams();
    const [pokemonInfo, setPokemonInfo] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/"+id).then(res => {
            setPokemonInfo(res.data);
            setLoading(false);
        })
    })

    if (loading) return "Loading..."

    return (
        <div style={{paddingLeft: "60px", paddingTop: "20px"}}>
            <Link to="/react-poke-demo" className="pokemonName">Back to List</Link><br/>
            {/* <Link to="/pokemonList" className="pokemonName">Back to List</Link><br/> */}
            {(parseInt(id)-1)>0 && <Link to={"/pokemonInfo/"+(parseInt(id)-1)} className="pokemonName">Previous</Link>}<br/>
            {(parseInt(id)+1)<899 && <Link to={"/pokemonInfo/"+(parseInt(id)+1)} className="pokemonName">Next</Link>}<br/>

            <div className={"main-con "+pokemonInfo.types[0].type.name}>

                <div className="container">
                    <h2>{pokemonInfo.name.charAt(0).toUpperCase()+pokemonInfo.name.substring(1)+"  #"+pokemonInfo.id}</h2>
                    {pokemonInfo.sprites.other["official-artwork"].front_default && <img className="artwork" src={pokemonInfo.sprites.other["official-artwork"].front_default} alt="official artwork" />}
                </div>
                {/* <br/> */}
                <div className="container">
                    <h3>Sprites</h3>
                    <div style={{display:'flex'}}>    
                        <div className="male">
                            {pokemonInfo.sprites.front_female && <h4 className="gender">Male</h4>}
                            {pokemonInfo.sprites.front_default && <img className="sprite" src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name+" front"} />}
                            {pokemonInfo.sprites.back_default && <img className="sprite" src={pokemonInfo.sprites.back_default} alt={pokemonInfo.name+" back"} />}
                        </div>
                        {pokemonInfo.sprites.front_female && <div className="female">
                            <h4 className="gender">Female</h4>
                            {pokemonInfo.sprites.front_female && <img className="sprite" src={pokemonInfo.sprites.front_female} alt={pokemonInfo.name+" front"} />}
                            {pokemonInfo.sprites.back_female && <img className="sprite" src={pokemonInfo.sprites.back_female} alt={pokemonInfo.name+" back"} />}
                        </div>}
                    </div>
                </div>

                <div className="container">
                    <h3>Type(s)</h3>
                    <div className="types">
                        {pokemonInfo.types.map(type => (
                            <p key={type.type.name} className={"type "+type.type.name}>
                                {type.type.name.charAt(0).toUpperCase()+type.type.name.substring(1)}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="container">
                    <h3>Abilities</h3>
                    <div id="abilities">
                        {pokemonInfo.abilities.map(ability => (
                            <p key={ability.ability.name} className="ability">
                                {ability.is_hidden ? ability.ability.name.charAt(0).toUpperCase()+ability.ability.name.substring(1)+" (hidden)" : ability.ability.name.charAt(0).toUpperCase()+ability.ability.name.substring(1)}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="container">
                    <h3>Stats</h3>
                    <div id="stats">
                        {pokemonInfo.stats.map(stat => (
                            <p key={stat.stat.name} className="stat">
                                {stat.stat.name.charAt(0).toUpperCase()+stat.stat.name.substring(1).replace("-"," ")+": "+stat.base_stat}
                            </p>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}
