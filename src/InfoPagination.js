import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

export default function InfoPagination({ id }) {
    id = parseInt(id);
    return (
        <div>
            {(id-1)>0 && <Link to={"/pokemonInfo/"+(id-1)} className="pokemonName previous navLink">&laquo; Previous</Link>}
            {(id+1)<899 && <Link to={"/pokemonInfo/"+(id+1)} className="pokemonName next navLink">Next &raquo;</Link>}
        </div>
    )
}
