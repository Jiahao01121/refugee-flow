import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='container navbar'>
      <Link to='/'>Refugee Flow</Link>
        <nav className='nav-links'>
          <Link to='/war'>War</Link>
          <Link to='/route'>Route</Link>
          <Link to='/about'>About</Link>
        </nav>
      </div>
  )
}
