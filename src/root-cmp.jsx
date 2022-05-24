import React from 'react';
// import { Hero } from './pages/hero';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes'
import {AppHeader} from './cmps/app-header'
function App() {
  return (
    <Router>
    <div className="App">
     <AppHeader/>
     <main className="app-container">
       {/* <Hero/> */}
   
     <Switch>
      {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
     </Switch>
     </main>
    </div>
    </Router>
  );
}

export default App;
