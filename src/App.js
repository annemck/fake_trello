import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LogIn from './components/login.js';
import Projects from './components/projects.js';
import Navigation from './components/nav.js';

class App extends Component{
  
  render(){
    
    return(
      <BrowserRouter>
        <div>
            <Navigation/>
            <Switch>
              <Route path="/" exact component={LogIn}/>
              <Route path="/user/:id/projects" exact component={Projects}/>
            </Switch>
        
        </div>
      </BrowserRouter>
    );
    
  }
  
}

export default App;
