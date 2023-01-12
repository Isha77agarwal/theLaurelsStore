import React from 'react'
import UseMediaQuery from '../utils/UseMediaQuery';
import MenuD from '../components/MenuD';
import MenuPhone from '../components/MenuPhone'
import { Fab } from '@mui/material'
import whatsAppIcon from '../assets/whatsapp-48.png'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
    const [width] = UseMediaQuery();
    return (
        <div>
            {width >= 922 ? <MenuD /> : <MenuPhone />}
            <a href='https://wa.link/x2o4n3'>
                <Fab aria-label="whatsApp-link" sx={{
                    margin: 0,
                    top: 'auto',
                    right: 'auto',
                    bottom: 20,
                    left: 20,
                    position: 'fixed',
                }}><img src={whatsAppIcon} alt='whatsappLogo' /></Fab></a>
        </div>
    )
}

export default HomeScreen