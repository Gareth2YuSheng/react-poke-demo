import React, {useState, useEffect} from 'react'
import Pagination from './Pagination';
import SearchPoke from './SearchPoke';
import PokemonList from './PokemonList';
import Loading from './Loading';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import logo from './logo_crop.png';
import mudkip from './mudkip.png';
import './App.css';

export default function Home() {
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
    },[currentPageUrl]);

    function nextPage() {
    setCurrentPageUrl(nextPageUrl);
    }

    function prevPage() {
    setCurrentPageUrl(prevPageUrl);
    }

    if (loading) return <Loading />;
    
    
    return (
        <div style={{padding:"20px 60px"}}>
            <Grid container className="main-con red" >
                <div className="container">
                    <img className="logo" src={logo} alt="pokemon" />
                    <img className="art" src={mudkip} alt="mudkip" />
                </div>

                <div className="container">
                    <h3>Pokémon Search</h3>
                    <div className="searchCon" style={{ }}>
                        <SearchPoke />
                    </div>
                </div>
                
                <div className="container">
                    <h3>List of Pokémon</h3>
                    <PokemonList pokemon={pokemon} />
                    <Pagination nextPage={nextPageUrl ? nextPage : null} prevPage={prevPageUrl ? prevPage : null} /> 
                </div>
                
            </Grid>
        </div>
    )
}
