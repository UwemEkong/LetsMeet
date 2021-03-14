import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { useState } from 'react';
import Home from './pages/Home';
import Category from './pages/Category';
import Form from './pages/Form';
import EventsPage from './pages/EventsPage';
import GroupsPage from './pages/GroupsPage';
import Logo from './components/Logo';

function App() {
  const [eventResults, setEventResults] = useState([]);

  return (
   
    <Router>
       <Logo/>
      <Switch>
        
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/categories" component={Category} />

      <Route path="/form/:category">
        <Form setEventResults={setEventResults}/>
      </Route>
      <Route path="/events">
        <EventsPage eventResults={eventResults}/>
      </Route>
      <Route path="/groups">
        <GroupsPage/>
      </Route>
      </Switch>
    </Router>
  
  )
}

export default App;
