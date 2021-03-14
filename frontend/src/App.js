import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from 'react';
import Home from './pages/Home';
import Category from './pages/Category';
import EventsPage from './pages/EventsPage';
import GroupsPage from './pages/GroupsPage';
import Logo from './components/Logo';

function App() {
  const [results, setResults] = useState([]);
  const [formParams, setFormParams] = useState({});

  return (
    <Router>
      <Logo />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/categories">
          <Category setResults={setResults} setFormParams={setFormParams} />
        </Route>

        <Route path="/events">
          <EventsPage setResults={setResults} results={results} formParams={formParams} />
        </Route>
        <Route path="/groups">
          <GroupsPage setResults={setResults} results={results} formParams={formParams} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
