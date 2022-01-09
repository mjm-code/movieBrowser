import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoVideo  } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Results = ({results, }) => {
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);
    let navigate = useNavigate();

    const checkPoster = (url) => {
        if(url === 'N/A') return <FontAwesomeIcon className='movie-card-img-placeholder' icon={faPhotoVideo} size={'lg'} />
        else return <img className='movie-card-img' src={url} alt="poster"></img>
    }

    const shortenTitle = (title) => {
        if(title.length > 20) return title.substring(0,20) + '...';
        else return title;
    }


    useEffect(()=>{

        if(results.Response === 'False'){ 
            setError('Movie not found.'); 
            setMovies([]); 
        }       
        
        if(results.Search) {setMovies([...results.Search]); setError(null) }
    }, [results])
    
    return (
        <div className='search-res-container'>
            
            { error ?  <div className='search-error'><p>{error}</p></div> : <p className='search-res-title'>Search results :</p> }
            
                { movies.length > 0 && 
                    <div className='search-res-body'>   
                        {movies.map(m => {
                            return  <div className='search-res-movie-card' id={m.imdbID} key={m.imdbID} onClick={()=>navigate(`/movies/${m.imdbID}`)}> 
                                        <p className='search-res-card-title'>Title:<span> </span>{shortenTitle(m.Title)}</p>
                                        {checkPoster(m.Poster)}
                                        <p className='search-res-card-year'>Year:<span> </span>{m.Year}</p>
                                    </div>})
                        }
                    </div>        
                }
            
        </div>  
    )
}

export default Results
