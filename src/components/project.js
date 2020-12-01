import React from 'react';
import {Link} from 'react-router-dom';

const Project = ({project}) => {
  if (!project){
    return(
      <p>Loading project...</p>
    )
  }
  
  //const url = "/project/" + project.proj_id;
  
  // return (
  //   <div>
  //   <React.Fragment>
  //
  //     <Link to={url}>
  //      {project.proj_name}
  //     </Link>
  //
  //   </React.Fragment>
  //   </div>
  // )
  
  return(
    <div>
    {project.proj_name}
    </div>
  )
  
}

export default Project;
