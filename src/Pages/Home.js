import React, {useState, useEffect, useContext} from 'react'
import { Input, Form } from 'semantic-ui-react'
import Results from '../Components/Results';
import TopMovieList from '../Components/TopMovieList';
import {topPick} from '../Res/data/topPickData.json';
import Axios from 'axios';
import { RootContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import { saveInput } from '../hooks/localStorage';
import Error from '../Components/Error';



const Home = () => {
    const [input, setInput] = useState('')
    const [callApi, setCallApi] = useState(false)   
    const [movies, setMovies] = useState([])
    const [screenWidth, setScreenWidth] = useState(0)
    const [topMovies, setTopMovies] = useState([])
    const {clearPage, setClearPage} = useContext(RootContext)
    
    //clear results when home button was clicked on header component, connected with useContext hook
    useEffect(()=> {if(clearPage){setMovies([]); setInput('');setClearPage(false)}},[clearPage, setClearPage])

    useEffect(()=>{
        const setWidth = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', setWidth);
        setWidth();
        
        //save default top pick movies in local storage
        const savedTopPick = localStorage.getItem('topPick');
        if(!savedTopPick) localStorage.setItem('topPick', JSON.stringify(topPick));
        
        setTopMovies(localStorage.getItem('topPick'));
        
    },[])

    useEffect( ()=>{
        
        const fetchApi = async (input) => {
            
            Axios.get(`https://www.omdbapi.com/?s=${input}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(function (response) {
                setMovies([response.data]);
                saveInput(input)   
            }).catch(function (error) {  
                //ToDo, error should be filtered and only user friendly one displayed 
                //console.log(error);
                <Error error={'Try again later...'}/>
            });
        }

        if(callApi){
            fetchApi(input);
            setCallApi(false);
        }
        return
    }, [callApi, input])

    const formSubmit = (e) => {
        e.preventDefault();
        setCallApi(true);
    }

    const inputSize = () => {
        if(screenWidth > 800) return 'big';
        else if(screenWidth < 450) return 'small';
        else return 'large';
    }

    return (
        <>  
            <Form className='homeContainer' onSubmit={(e) => formSubmit(e)}>
                <Input value={input} action='Search' placeholder='Type movie name...' size={inputSize()} onChange={(e)=>setInput(e.target.value)}/> 
                {input?<FontAwesomeIcon 
                    style={{color:'black', zIndex: 1, marginLeft: -40, cursor: 'pointer'}} 
                    icon={faBackspace} 
                    size={'2x'} 
                    onClick={()=>setInput('')}
                />:''}
            </Form>
            {movies.length > 0 && <Results results={movies[0]}/>}
            {topMovies.length > 0 && <TopMovieList movies={topMovies}/>}
        </>
    )
}

export default Home
