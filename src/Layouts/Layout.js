import React, {useContext, useEffect, useRef, useState} from 'react'
import Header from '../Components/Header'
import { RootContext } from '../App'

const Layout = ({children}) => {
    const [height, setHeight] = useState(null)
    const {amendBackgroundHeight} = useContext(RootContext)
    let bg = useRef()
    let container = useRef()

    useEffect(()=>{
        setHeight(container.current.clientHeight)
    },[amendBackgroundHeight])

    return (
        <>  
            <div ref={bg} style={{minHeight: (height? height: '100vh')}} className='bgImg'></div>
            <div ref={container} className='container'>
                <Header/>
                {children}
            </div>
                      
        </>
    )
}

export default Layout
