import React, {useState, useContext} from 'react'
import { Menu } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { RootContext } from '../App'

const Header = () => {
    const navigate = useNavigate()
    const [activeLink, setActiveLink] = useState('home')
    const {setClearPage, setAmendBH, amendBackgroundHeight} = useContext(RootContext)

    return (
        <Menu fixed={'top'} secondary style={{backgroundColor: 'black', minHeight: '80px'}}>
            <Menu.Item  active={ activeLink === 'home' } onClick={ () => {setActiveLink('home'); navigate('/'); setClearPage(true); setAmendBH(!amendBackgroundHeight)}}>
                <FontAwesomeIcon className='navLink'  icon={faHome} size={'lg'} />
            </Menu.Item>

            
            <h1 className='logo'>movieBrowser</h1>
            

            <Menu.Menu position='right'>
                <Menu.Item active={ activeLink === 'user'} onClick={ () => {setActiveLink('user'); navigate('user'); setAmendBH(!amendBackgroundHeight)}}>
                    <FontAwesomeIcon className='navLink' icon={faUser} size={'lg'} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Header
