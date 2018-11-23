import * as React from 'react';
import { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Header from './components/Header/index';
import Posts from './components/Posts/index';
import Profile from './components/Profile';
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';
import Explore from './components/Explore';

interface IState {
  user : {
    id: any,
    name: any,
    username: any,
    email: any,
    avatarUrl: any,
    bio: any
  }
  isLoggedIn: boolean,
}

class App extends Component<{}, IState> {
  public constructor(props: any) {
    super(props)
    this.state = {
      user: {
        id: null,
        name: null,
        username: null,
        email: null,
        avatarUrl: null,
        bio: null
      },
      isLoggedIn: false
    }
  }

  public render() {

    // Loads home page with posts from users they are following
    return (
      <BrowserRouter>
      <div>
        <Header avatar={this.state.user.avatarUrl} name={this.state.user.name}/>
      <Switch>
        <Route path="/" exact render={
          () => <Posts user={this.state.user} /> 
        }/>

        <Route path="/profile" exact render={
          () => <Profile userName={this.state.user.name} userAvatar={this.state.user.avatarUrl} userEmail={this.state.user.email} /> 
        }/>

        <Route path="/login" render={
          () => <Login/>
        }/>

        <Route path="/completeregistration" exact render={
          () => <Registration /> 
        }/>

        <Route path="/logout" exact render={
          () => <Logout /> 
        }/>

        <Route path="/explore" exact render={
          () => <Explore /> 
        }/>
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;
