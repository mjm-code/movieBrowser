import React, {useState, useEffect} from 'react'
import { Message, Button } from 'semantic-ui-react'


const User = () => {
    const [history, setHistory] = useState(null);

    useEffect(()=>{
        if(localStorage.getItem('savedHistory')){
            let h =JSON.parse(localStorage.getItem('savedHistory'));
            setHistory(h);
        }
        
    }, []);

    
    return (
        <Message style={{minWidth: '50%'}}>
            <Message.Header>Browser History</Message.Header>
            {history? history.map( (h, i) => <div className='user-history-item' key={i}><p>{(h? h:'Empty search')}</p></div> ) : <p>History is empty.</p>}
            {history? <Button color='red' onClick={ ()=> {localStorage.setItem('savedHistory', []); setHistory(null) }}>Clear History</Button> : ''}
        </Message>
    )
}

export default User
