import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PokemonList from './PokemonList';

export default function PokemonType() {
    let { id } = useParams();
    const [typeInfo, setTypeInfo] = useState();
    const [pokemon, setPokemon] = useState();
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get("https://pokeapi.co/api/v2/type/"+id).then(res => {
            setTypeInfo(res.data);
            setPokemon(res.data.pokemon.map(p => ({"name": p.pokemon.name, "url": p.pokemon.url})));
            setLoading(false);
            setType(res.data.name.charAt(0).toUpperCase()+res.data.name.substring(1));
        })
    },[id]);

    if (loading) return "Loading...";

    return (
        <div style={{padding:"20px 60px"}}>
            <Grid container className={"main-con "+id} >

                <div className="container">
                    <h2 id="typename">{type}</h2>
                    <p>{"Introduced in Generation "+typeInfo.generation.name.split("-")[1].toUpperCase()}</p>
                    <div className="typeAnD">
                        <h3>Attack</h3>
                        <p>{type+" is Super Efective against:"}</p>
                        <div className="types">
                            {typeInfo.damage_relations.double_damage_to.map(type => (
                                <Link key={type.name} to={"/type/"+type.name} className={"type "+type.name}>{type.name.charAt(0).toUpperCase()+type.name.substring(1)}</Link>
                            ))}
                        </div>
                        <p>{type+" is Not Very Effective against:"}</p>
                        <div className="types">
                            {typeInfo.damage_relations.half_damage_to.map(type => (
                                <Link key={type.name} to={"/type/"+type.name} className={"type "+type.name}>{type.name.charAt(0).toUpperCase()+type.name.substring(1)}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="typeAnD">
                        <h3>Defence</h3>
                        <p>{"Types that have No Effect against "+type+":"}</p>
                        <div className="types">
                            {typeInfo.damage_relations.no_damage_from.map(type => (
                                <Link key={type.name} to={"/type/"+type.name} className={"type "+type.name}>{type.name.charAt(0).toUpperCase()+type.name.substring(1)}</Link>
                            ))}
                        </div>
                        <p>{"Types that are Not Very Effective against "+type+":"}</p>
                        <div className="types">
                            {typeInfo.damage_relations.half_damage_from.map(type => (
                                <Link key={type.name} to={"/type/"+type.name} className={"type "+type.name}>{type.name.charAt(0).toUpperCase()+type.name.substring(1)}</Link>
                            ))}
                        </div>
                        <p>{"Types that are Super Effective against "+type+":"}</p>
                        <div className="types">
                            {typeInfo.damage_relations.double_damage_from.map(type => (
                                <Link key={type.name} to={"/type/"+type.name} className={"type "+type.name}>{type.name.charAt(0).toUpperCase()+type.name.substring(1)}</Link>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="container">
                    <h3>List of Pokémon with this Type:</h3>
                    <PokemonList pokemon={pokemon} />
                </div>
                
            </Grid>
        </div>
    )
}
