// import React from 'react';
// import { Hero } from './pages/hero';
import { Switch, Route } from 'react-router-dom';
import routes from './routes'
import { AppHeader } from './cmps/app-header'
import { BoardApp } from './pages/board-app';
import {Screen} from './cmps/dynamic-cmps/screen'
import { Hero } from './pages/hero'
import { HomePage } from './pages/home-page'
// import { BoardApp } from './pages/board-app';

function App() {
  return (

    <div className="App">
      <AppHeader />
      <main className="app-container">
        {/* <Hero/> */}

        <Switch>
          {/* {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)} */}
          <Route path='/' exact component={Hero}/>
          <Route path='/home' component={HomePage}/>
          <Route path='/board/:boardId' component={BoardApp}/>
          {/* <Route exact path= '/board/:boardId' component={BoardApp} >
             <Route path=':groupId/:taskId' >
               <Screen/>
             </Route>
          </Route> */}
        </Switch>
      </main>
    </div>


  );
}

export default App;
