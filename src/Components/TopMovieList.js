import React from 'react';
import { useNavigate } from 'react-router-dom'
import { saveInput } from '../hooks/localStorage';

const TopMovies = ({movies}) => {
    let navigate = useNavigate();
    const m = JSON.parse(movies);   
    return (
        <div className='top-movies-container'>
            <div className='top-movies-title'><p>Top Movies</p></div>
            <div className='top-movies-body'>
                {m.map(m=> <div key={m.imdbID} onClick={()=>{navigate(`/movies/${m.imdbID}`); saveInput(m.Title)}} className='movie-avatar-box'><img className='movie-avatar-img' src={m.Poster} alt="poster"></img></div>)}   
            </div>          
        </div>
    )
}

export default TopMovies
