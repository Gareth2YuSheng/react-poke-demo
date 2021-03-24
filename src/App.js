import Home from './Home';
import PokemonInfo from './PokemonInfo';
import {Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Switch>
      <Route exact path="/">
          <Redirect exact from="/" to="/react-poke-demo" />
        </Route>
        <Route exact path="/react-poke-demo">
          <Home />
        </Route>
        <Route exact path="/pokemonInfo/:id">
          <PokemonInfo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
