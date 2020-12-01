import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LogIn from './components/login.js';
import ProjectList from './components/projectList.js';
import Navigation from './components/nav.js';

class App extends Component{
  
  render(){
    
    return(
      <BrowserRouter>
        <div>
            <Navigation/>
            <Switch>
              <Route path="/:id/projects" exact component={ProjectList}/>
              <Route path="/" exact component={LogIn}/>
            </Switch>
        
        </div>
      </BrowserRouter>
    );
    
  }
  
}

export default App;
