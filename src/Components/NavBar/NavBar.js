import React from 'react'
import './NavBar.css'
import search_icon from '../../Assets/search_icon.svg'
import bell_icon from '../../Assets/bell_icon.svg'
import profile_img from '../../Assets/profile_img.png'
import caret_icon from '../../Assets/caret_icon.svg'

function NavBar() {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img className='icons' src={search_icon} alt="" />
        <p>Children</p>
        <img className='icons' src={bell_icon} alt="" />
        <div className="navbar-profile">
          <img className='profile' src={profile_img} alt="" />
          <img className='icons' src={caret_icon} alt="" />
          <div className="dropdown">
            <p>Sign Out of Netflix</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NavBar
