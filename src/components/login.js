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
      .then((response) => response.json())
      .then((data) => history.push(`${data[0].user_id}/projects`))
      
    } catch (err){
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
