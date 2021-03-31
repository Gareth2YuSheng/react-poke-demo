import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import PokemonList from './PokemonList';
import Loading from './Loading';
import Grid from '@material-ui/core/Grid';

export default function PokemonAbility() {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [abilityInfo, setAbilityInfo] = useState();
    const [pokemon, setPokemon] = useState([]);
    const [pokemonHidden, setPokemonHidden] = useState([]);
    const [abilityName, setAbilityName] = useState("");
    const [flavorTexts, setFlavorTexts] = useState({});

    useEffect(() => {
        setLoading(true);
        axios.get("https://pokeapi.co/api/v2/ability/"+id).then(res => {
            setAbilityInfo(res.data);
            setAbilityName(res.data.name.charAt(0).toUpperCase()+res.data.name.substring(1));
            setPokemon(res.data.pokemon.map(p => {
                if (!p.is_hidden) return {"name": p.pokemon.name, "url": p.pokemon.url};
            }).filter(p => (p!==undefined)));
            setPokemonHidden(res.data.pokemon.map(p => {
                if (p.is_hidden) return {"name": p.pokemon.name, "url": p.pokemon.url};
            }).filter(p => (p!==undefined)));
            let ft ={};
            res.data.flavor_text_entries.map(f => {
                if (f.language.name=="en") {
                    if (!ft.hasOwnProperty(f.flavor_text)) {
                        ft[f.flavor_text] = [tidyGenName(f.version_group.name)];
                    } else {
                        ft[f.flavor_text].push(tidyGenName(f.version_group.name));
                    }
                }
            });
            setFlavorTexts(convertFtObjToArray(ft));
            setLoading(false);
        })
    },[id]);

    function tidyGenName(gen) {
        gen = gen.split("-");
        gen = gen.map(w => (w.charAt(0).toUpperCase()+w.substring(1)));
        if (gen.length > 1) {
            gen.splice(gen.length/2,0,"/");
            return gen.join(" ");
        } 
        return gen[0];
    }

    function convertFtObjToArray(obj) {
        let arr = [];
        for (let x in obj) {
            arr.push({"flavorText": x, "gen": obj[x]});
        }
        return arr;
    }

    if (loading) return <Loading />;

    return (
        <div style={{padding:"20px 60px"}}>
            <Link to="/react-poke-demo" className="pokemonName navLink">Back to Home</Link>

            <Grid container className={"main-con red"} >

                <div className="container">
                    <h2>{abilityName+" (Ability)"}</h2>
                    <p>{"Introduced in Generation "+abilityInfo.generation.name.split("-")[1].toUpperCase()}</p>

                    <div className="typeAnD">
                        <h3>Effect</h3>
                        <p>{abilityInfo.effect_entries.filter(e => {if (e.language.name=="en") return e.effect})[0].effect}</p>
                    </div>

                    <div className="typeAnD">
                        <h3>Game descriptions</h3>
                        <table>
                            <tbody>
                                {flavorTexts.map(ft => (<tr>
                                    <th>{ft.gen.join(" | ")}</th>
                                    <td>{ft.flavorText}</td>
                                </tr>))}
                                
                            </tbody>
                        </table>
                    </div>

                    <div className="typeAnD" id="otherLang">
                        <h3>Other Languages</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Japanese</th>
                                    <td>{abilityInfo.names.map(n => {if (n.language.name=="ja-Hrkt") return n.name})}</td>
                                </tr>
                                <tr>
                                    <th>Korean</th>
                                    <td>{abilityInfo.names.map(n => {if (n.language.name=="ko") return n.name})}</td>
                                </tr>
                                <tr>
                                    <th>Chinese</th>
                                    <td>{abilityInfo.names.map(n => {if (n.language.name=="zh-Hans") return n.name})}</td>
                                </tr>
                                <tr>
                                    <th>French</th>
                                    <td>{abilityInfo.names.map(n => {if (n.language.name=="fr") return n.name})}</td>
                                </tr>
                                <tr>
                                    <th>German</th>
                                    <td>{abilityInfo.names.map(n => {if (n.language.name=="de") return n.name})}</td>
                                </tr>
                                <tr>
                                    <th>Spanish</th>
                                    <td>{abilityInfo.names.map(n => {if (n.language.name=="es") return n.name})}</td>
                                </tr>
                                <tr>
                                    <th>Italian</th>
                                    <td>{abilityInfo.names.map(n => {if (n.language.name=="it") return n.name})}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    
                </div>
                
                <div className="container">
                    <h3>{"Pokemon with "+abilityName}</h3>
                    <PokemonList pokemon={pokemon} />
                </div>

                <div className="container">
                    <h3>{"Pokemon with "+abilityName+" as a Hidden Ability"}</h3>
                    <PokemonList pokemon={pokemonHidden} />
                </div>
                
            </Grid>
        </div>
    )
}
