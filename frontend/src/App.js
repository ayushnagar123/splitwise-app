import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import MyGroups from './Components/MyGroups'
function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul class="container">
            <li>
              <Link to="/">My groups</Link>
            </li>
            <li>
              <Link to="/about">Create Group</Link>
            </li>
            <li>
              <Link to="/users">Create User</Link>
            </li>
            <li>
              <Link to="/users">Create User</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            {/* <About /> */}
          </Route>
          <Route path="/users">
            {/* <Users /> */}
          </Route>
          <Route path="/">
            <MyGroups />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
