import './App.css';
import DroneProvider from './context/DroneContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './routes/home';
import SettingsPage from './routes/settings';

function App() {
  return (
    <DroneProvider>
      <Router>
        <Switch>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </DroneProvider>
  );
}

export default App;
