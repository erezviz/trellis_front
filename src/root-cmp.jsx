// import React from 'react';
// import { Hero } from './pages/hero';
import { Switch, Route } from 'react-router-dom';
import routes from './routes'
import { AppHeader } from './cmps/app-header'
import { BoardApp } from './pages/board-app';
import {Screen} from './cmps/dynamic-cmps/screen'
import { Hero } from './pages/hero'
import { HomePage } from './pages/home-page'
import { LoginSignup } from './cmps/board/login-signup';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
// import { BoardApp } from './pages/board-app';

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <div className="App">
      <main className="app-container">
      <AppHeader />
        {/* <Hero/> */}

        <Switch>
          {/* {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)} */}
          <Route path='/' exact component={Hero}/>
          <Route path='/login' component={LoginSignup}/>
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

    </MuiPickersUtilsProvider>
  );
}

export default App;
