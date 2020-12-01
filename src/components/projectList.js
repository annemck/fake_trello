import React, {Component, useState} from 'react';
import LogIn from './login.js';
import Project from './project.js';


const ProjectList = (props) => {
  const user = props.location.state.user;
  const projects = props.location.state.projects[0];
  
  const allProjects = projects.map((project) => {
    return (
      <li key={project.proj_id}>
        <div>
          <Project project={project} />
        </div>
      </li>
    )
  })
  
  
  if (projects.length === 0){
    return(
      <p>You don't seem to have any projects</p>
    )
  } else {
    return(
      <div>
        <p>{user.firstName}'s Projects</p>
        <ul>
          {allProjects}
        </ul>
      </div>
    )
  }
}
  

export default ProjectList;
