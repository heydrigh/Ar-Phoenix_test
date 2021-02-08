import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Users from '../pages/Users';
import Register from '../pages/Register';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Users} />
    <Route path="/register" component={Register} />
  </Switch>
);

export default Routes;