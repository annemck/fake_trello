import React from 'react';
import {NavLink} from 'react-router-dom';
import Projects from './projects.js';
import LogIn from './login.js';

const Navigation = () => {
  return(
    <div>
      <NavLink to="/">LogIn</NavLink>
      <NavLink to="/user/:id/projects">View Projects</NavLink>
    </div>
  );
}

export default Navigation;
