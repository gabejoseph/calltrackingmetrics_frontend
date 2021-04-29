import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import SimpleMenu from '../containers/SimpleMenu'

class Header extends React.Component {
    
    constructor () {
        super()

        let user = localStorage.user ? JSON.parse(localStorage.user) : ""

        this.state = {
            user: user
        }
    }

    handleClick = () => {
        
    }

    render () {
        return(
        <div className="header" >
            <Link to='/' >
                <img 
                    className="header_icon"
                    src="https://www.hubspot.com/hubfs/Fergals/Case%20Study%20Logos/CallTrackingMetrics%20Logo.png"
                    alt=""
                />
            </Link>

            <div className='header_right'>
                {this.state.user
                ? 
                <>
                </>
                :
                <></>
                }
                <SimpleMenu />
            </div>
        </div>
        
    )}
}

export default Header
