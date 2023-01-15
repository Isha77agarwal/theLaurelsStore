import React from 'react'
import UseMediaQuery from '../utils/UseMediaQuery';
import MenuD from '../components/MenuD';
import MenuPhone from '../components/MenuPhone'

const HomeScreen = () => {
    const [width] = UseMediaQuery();
    return (
        <div>
            {width >= 922 ? <MenuD /> : <MenuPhone />}
        </div>
    )
}

export default HomeScreen