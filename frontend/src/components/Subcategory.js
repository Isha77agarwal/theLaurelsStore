import React from 'react'
import { subcategories } from '../data/data.js'
import { Link } from 'react-router-dom'

const Subcategory = ({ category }) => {
    return (
        <div className='Subcategory'>
            {subcategories[category].map((subCategory, index) => (
                <li key={index}><Link style={{
                    color: 'inherit', textDecoration: 'none'
                }} to={`product/${subCategory}`}>{subCategory}</Link></li>
            ))}
        </div>
    )
}

export default Subcategory