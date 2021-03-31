import Home from './Home';
import PokemonInfo from './PokemonInfo';
import PokemonType from './PokemonType';
import PokemonAbility from './PokemonAbility';
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
        <Route exact path="/type/:id">
          <PokemonType />
        </Route>
        <Route exact path="/ability/:id">
          <PokemonAbility />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
