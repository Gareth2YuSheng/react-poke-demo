import React from 'react';
import './App.css';

export default function Pagination({ nextPage, prevPage }) {
    return (
        <div>
            {prevPage && <button className="navLink pokemonName previous" onClick={prevPage}>Previous</button>}
            {nextPage && <button className="navLink pokemonName next" onClick={nextPage}>Next</button>}
        </div>
    )
}
