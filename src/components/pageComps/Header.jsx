import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { DropdownMenu } from './DropDownMenu';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';

export const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };


  return (
    <>
      <header className='app-header'>
      <div
         className='profile-icon-container'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ProfileIcon style={{ fontSize: 35, color: 'white' }}/>
          {/* <DropdownMenu /> */}
          {isDropdownVisible && <DropdownMenu />}
        </div>
        <div className='home-icon-container'>
          <Link to="/"><HomeIcon style={{ fontSize: 35, color: 'white' }}/></Link>
        </div>
        <h1>General Knowledge Quiz</h1>
      </header>
      <Outlet/>
    </>
  )
}
