import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';

import { Switch } from 'react-router';
import Signin from './pages/Signin';
import PrivateRouter from './components/PrivateRouter';
import Home from './pages/Home/Index';
import PublicRouter from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRouter path="/signin">
          <Signin />
        </PublicRouter>
        <PrivateRouter path="/">
          <Home />
        </PrivateRouter>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
