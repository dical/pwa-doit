import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import deepOrange from 'material-ui/colors/deepOrange';

import Events from './events';
import Event from './event';
import Login from './login';
import Messages from './messages';
import Settings from './settings';
import SignIn from './sign-in';
import User from './user';
import Welcome from './welcome';
import Support from './support';
import Recovery from './recovery';

const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
        secondary: deepOrange
    }
});

class App extends React.Component {
    render() {
        return <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <div id="shell">
                    <Switch>
                        {
                            document.cookie.indexOf('userId') < 0 &&
                            <Route exact path="/" component={Welcome}/>
                        }

                        {
                            document.cookie.indexOf('userId') > -1 &&
                            <Route exact path="/" component={Events}/>
                        }

                        <Route path='/sign-in' component={SignIn}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/user' component={User}/>
                        <Route path="/events" component={Events}/>
                        <Route path="/event" component={Event}/>
                        <Route path="/messages" component={Messages}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/support" component={Support}/>
                        <Route path="/recovery" component={Recovery}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>;
    }
}

render(<App/>, document.querySelector('#root'));