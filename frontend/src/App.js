import React from 'react';
import './App.scss';
import Body from './components/Body';
import NavBar from './components/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Category from './components/Category';
import Meal from './components/Meal';
import MyRecipies from './components/MyRecipies';

function App() {
  
  return (
    <div className="App">
      <Router>
      <NavBar/>
        <Switch>
          <Route exact path="/myRecipies" component={MyRecipies}/>

          <Route exact path="/" component={Body}/>
          <Route exact path="/category/:catId" component={Category}/>
          <Route exact path="/dish/:mealId" component={Meal}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
