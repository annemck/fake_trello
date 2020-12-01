import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


const LogIn = () => {

  const history = useHistory();
  let [userEmail, setEmail] = useState(" ");
  let [userPassword, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();

      userEmail = userEmail.trim();

      fetch(`http://localhost:5000/login/${userEmail}/${userPassword}`)
      .then((userResponse) => userResponse.json())
      .then((userData) => fetch(`http://localhost:5000/${userData[0].user_id}/projects`)
                      .then((projectResponse) => projectResponse.json())
                      .then((projectData) => history.push({pathname: `${userData[0].user_id}/projects`,
                      state: {user: {userId: userData[0].user_id,
                                    firstName: userData[0].first_name,
                                    lastName: userData[0].last_name},
                              projects: [projectData]
                            }
                      })))

    }
    catch (err)
    {
      console.log(err.message);
    }
  };

  return(
    <div>
      <p>Please enter your login details.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="text" name="user_email" value={userEmail} onChange={({target}) => setEmail(target.value)}/>
        </label>
        <br/>
        <br/>
        <label>
          Password
          <input type="password" name="user_password" value={userPassword} onChange={({target}) => setPassword(target.value)}/>
        </label>
        <br/>
        <br/>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default LogIn;
