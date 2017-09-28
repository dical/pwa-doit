import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/home';
import User from './pages/user';

render(
    <BrowserRouter><div>
        <Route exact path="/" component={Home}/>
        <Route path="/user" component={User} />
    </div>
    </BrowserRouter>
    , document.querySelector('#root')
);
