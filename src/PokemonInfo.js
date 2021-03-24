import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import InfoPagination from './InfoPagination';
import SearchPoke from './SearchPoke';

export default function PokemonInfo() {
    let { id } = useParams();
    const [pokemonInfo, setPokemonInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [spriteShiny, setSpriteShiny] = useState(false);
    const [spriteBtnSelected, setSpriteBtnSelected] = useState(["", ""]);
    
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/"+id).then(res => {
            setPokemonInfo(res.data);
            setLoading(false);
            setSpriteBtnSelected([res.data.types[0].type.name, ""]);
            setSpriteShiny(false);
        }).catch(error => {
            setLoading(false);
            // console.log(error)
        })
    }, [id])

    function toggleSpriteDefault() {
        setSpriteShiny(false);
        setSpriteBtnSelected([pokemonInfo.types[0].type.name, ""]);
    }

    function toggleSpriteShiny() {
        setSpriteShiny(true);
        setSpriteBtnSelected(["", pokemonInfo.types[0].type.name]);
    }

    if (loading) return "Loading..."

    return (
        <div style={{padding:"20px 60px"}}>
            <Link to="/react-poke-demo" className="pokemonName navLink">Back to Home</Link>

            <div className="searchConSide">
                <SearchPoke />
            </div>

            {!pokemonInfo && <div className="error">
                Pokemon not found
            </div>}
            
            {pokemonInfo && <div>
                <InfoPagination id={pokemonInfo.id} />            

                <Grid container className={"main-con "+pokemonInfo.types[0].type.name}>

                    <div className="container">
                        <h2>{pokemonInfo.name.charAt(0).toUpperCase()+pokemonInfo.name.substring(1)+"  #"+pokemonInfo.id}</h2>
                        {pokemonInfo.sprites.other["official-artwork"].front_default && <img className="artwork" src={pokemonInfo.sprites.other["official-artwork"].front_default} alt="official artwork" />}
                    </div>
                    
                    <div className="container">
                        <h3 id="spritesHeading">Sprites</h3>

                        <div id="spriteToggleBtnCon">
                            <button className={"spriteToggleBtn "+spriteBtnSelected[0]} onClick={toggleSpriteDefault} >Default</button>
                            <button className={"spriteToggleBtn "+spriteBtnSelected[1]} onClick={toggleSpriteShiny} >Shiny</button>
                        </div>

                        <div style={{display:'flex'}}>   

                            {!spriteShiny && <div id="default_sprite">
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
                            </div>}

                            {spriteShiny && <div id="shiny_sprite">
                                <div className="male">
                                    {pokemonInfo.sprites.front_shiny_female && <h4 className="gender">Male</h4>}
                                    {pokemonInfo.sprites.front_shiny && <img className="sprite" src={pokemonInfo.sprites.front_shiny} alt={pokemonInfo.name+" shiny front"} />}
                                    {pokemonInfo.sprites.back_shiny && <img className="sprite" src={pokemonInfo.sprites.back_shiny} alt={pokemonInfo.name+" shiny back"} />}
                                </div>
                                {pokemonInfo.sprites.front_shiny_female && <div className="female">
                                    <h4 className="gender">Female</h4>
                                    {pokemonInfo.sprites.front_shiny_female && <img className="sprite" src={pokemonInfo.sprites.front_shiny_female} alt={pokemonInfo.name+" shiny front"} />}
                                    {pokemonInfo.sprites.back_shiny_female && <img className="sprite" src={pokemonInfo.sprites.back_shiny_female} alt={pokemonInfo.name+" shiny back"} />}
                                </div>}
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
                        <h3>Height & Weight</h3>
                        <div id="hnw">
                            <h4>Height:</h4><p>{pokemonInfo.height/10+" m"}</p>
                            <h4>Weight:</h4><p>{pokemonInfo.weight/10+" kg"}</p>
                        </div>
                    </div>

                    <div className="container">
                        <h3>Stats</h3>
                        <div id="stats">
                            <table>
                                <tbody>
                                    {pokemonInfo.stats.map(stat => (
                                        <tr key={stat.stat.name.charAt(0).toUpperCase()+stat.stat.name.substring(1).replace("-"," ")}>
                                            <th>
                                                {stat.stat.name.charAt(0).toUpperCase()+stat.stat.name.substring(1).replace("-"," ")}
                                            </th>
                                            <td>
                                                {stat.base_stat}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <th key="total">Total</th>
                                        <td>{[0, ...pokemonInfo.stats].reduce((total, num)=>{return total+num.base_stat;})}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Grid>
            </div>}
            

        </div>
    )
}
