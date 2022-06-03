import { Switch, Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { AppHeader } from './cmps/app-header'
import { BoardApp } from './pages/board-app';
import { Screen } from './cmps/dynamic-cmps/screen'
import { Hero } from './pages/hero'
import { HomePage } from './pages/home-page'
import { LoginSignup } from './cmps/board/login-signup';


function App() {
  let pageStyle = ''
  const location = window.location.href
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="App">
        <main className={`app-container ${pageStyle}`}>
          <AppHeader />
          <Switch>
            <Route path='/' exact component={Hero} />
            <Route path='/login' component={LoginSignup} />
            <Route path='/home' component={HomePage} />
            <Route path='/board/:boardId' component={BoardApp} />
          </Switch>
        </main>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
