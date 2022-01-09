import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import { Loader, Dimmer, Image, Message} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Error from '../Components/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHourglass, faClock, faFolderOpen, faVideo, faPen, faUsers, faLanguage, faStar } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { RootContext } from '../App'

const Movie = () => {
    let {movieID} = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState([]);
    const {amendBackgroundHeight, setAmendBH} = useContext(RootContext)
    const navigate = useNavigate();

    useEffect(()=> {
        if(!movieID) navigate('/');
    }, [movieID, navigate])

    useEffect(()=>{

        const errorCheck = (res) => {
            if(res.Response === 'False'){ setError(res.Error); return true};
            return false;
        }


        const getMovieDetails = async (id) => {
            Axios.get(`https://www.omdbapi.com/?i=${id}&type=movie&plot=full&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                if(!errorCheck(response.data)) setMovie([response.data]);
                else setMovie([]);
                setIsLoading(false);
                setAmendBH(!amendBackgroundHeight)        
            })
                .catch(function (error) {  
                //console.log(error);
                <Error error={'Try again later...'}/>
            });
        }

        if(movieID)  getMovieDetails(movieID);

        // eslint-disable-next-line
    },[movieID])

    return (
        <>
            <Dimmer active={isLoading}>
                {isLoading ? <Loader size='massive'  /> : ''}
                
            </Dimmer>
            { movie.length > 0 &&   <div className='movie-container'>    
                                        <div className='movie-container-title'>
                                            <h2>
                                                <i>Title:</i><span> </span>{movie[0].Title}
                                            </h2>
                                            <h5><FontAwesomeIcon icon={faStar}/><i>Rating:</i><span>  </span>{movie[0].imdbRating} /10</h5>
                                        </div>
                                        <div className='movie-container-head'> 
                                            <Image src={movie[0].Poster} rounded size='medium'/>
                                            <div className='movie-container-details-box'>
                                                    
                                                <p><FontAwesomeIcon icon={faCalendar}/><span> </span>Year:<span> </span>{movie[0].Year}</p>
                                                <p><FontAwesomeIcon icon={faHourglass}/><span> </span>Released:<span> </span>{movie[0].Released}</p>
                                                <p><FontAwesomeIcon icon={faClock }/><span> </span>Runtime:<span> </span>{movie[0].Runtime}</p>
                                                <p><FontAwesomeIcon icon={faFolderOpen}/><span> </span>Genre:<span> </span>{movie[0].Genre}</p>
                                                <p><FontAwesomeIcon icon={faVideo}/><span> </span>Director:<span> </span>{movie[0].Director}</p>
                                                <p><FontAwesomeIcon icon={faPen}/><span> </span>Writer:<span> </span>{movie[0].Writer}</p>
                                                <p><FontAwesomeIcon icon={faUsers}/><span> </span>Actors:<span> </span>{movie[0].Actors}</p>
                                                <p><FontAwesomeIcon icon={faLanguage}/><span> </span>Language:<span> </span>{movie[0].Language}</p>

                                            </div>
                                        </div>

                                        <div className='movie-container-body'>
                                            <Message style={{color: 'white', backgroundColor: 'black'}}> 
                                                <Message.Header>Description:</Message.Header>
                                                <p>
                                                    {movie[0].Plot}
                                                </p>
                                            </Message>
                                        </div>
                                    </div>
            }
            { error.length > 0 && <Error error={error}/> }
            
        </>
            
    )
}

export default Movie
