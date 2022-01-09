
const saveInput = (input) => {
    
    if(localStorage.getItem('savedHistory')) {
        const history = JSON.parse(localStorage.getItem('savedHistory'));
        localStorage.setItem('savedHistory', JSON.stringify([...history, input]));
    }else{ localStorage.setItem('savedHistory', JSON.stringify([input])); } 

}

export {saveInput}