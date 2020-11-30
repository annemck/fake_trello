import React, {useState} from 'react';
import LogIn from './login.js';

//if user is loged in show projects, otherwise render login page

const Projects = (props) => {
  
  const first_name = props.location.state.first_name;
  const user_id = props.location.state.user_id;
  const [projectList, setProjects] = useState(null);
  
  const getProjects = async () => {
    try {
      fetch(`http://localhost:5000/${user_id}/project`)
      .then((response) => response.json())
      .then((data) => (setProjects(data)))
      console.log(projectList);
      console.log('the project list should be above');
    } catch (err){
      console.log(err.message);
    }
  
  }
  
  return(
    <div>
      <h1>Your Projects</h1>
      <p>Hello {first_name}!</p>
      
      <div>
      </div>

    </div>
  )
  
}

export default Projects;
