import React from 'react';
import './App.css';
import Body from './components/Body';
import NavBar from './components/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Category from './components/Category';
import Meal from './components/Meal';

function App() {

  const getfood = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52959")
    .then(res=>res.json())
    .then(res => {
      console.log(res)
    })
  }

  return (
    <div className="App">
      <NavBar/>
      <Router>
          <Route exact path="/" component={Body}/>
          <Route exact path="/category/:catId" component={Category}/>
          <Route exact path="/dish/:mealId" component={Meal}/>
      </Router>
    </div>
  );
}

export default App;
