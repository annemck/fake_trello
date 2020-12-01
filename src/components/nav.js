import React from 'react';
import {NavLink} from 'react-router-dom';
import ProjectList from './projectList.js';
import LogIn from './login.js';

const Navigation = () => {

  return(
    <div>
      <NavLink to="/:id/projects">Your Projects</NavLink>
      <NavLink to="/">Log In/Out</NavLink>
    </div>
  );
}

export default Navigation;
