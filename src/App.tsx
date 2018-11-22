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
          () => <Login />
        }/>

        <Route path="/completeregistration" exact render={
          () => <Registration completionHandler={this.handleCompletedRegistration} name={this.state.user.name} avatar={this.state.user.avatarUrl} email={this.state.user.email} /> 
        }/>

        <Route path="/logout" exact render={
          () => <Logout /> 
        }/>
      </Switch>
      </div>
      </BrowserRouter>
    );
  }

  public handleCompletedRegistration = () => {
    console.log("registration complete")
  }

  public responseFacebook = async (response: any) => {
    this.setState((previousState: any, currentProps: any) => {
      return {
        ...previousState, userEmail: response.email,
        userAvatar: response.picture.data.url,
        userName: response.name,
        isLoggedIn: true
      }
    })

    localStorage.setItem('userInfo.email', response.email);
    localStorage.setItem('userInfo.avatar', response.picture.data.url)
    localStorage.setItem('userInfo.name', response.name)
    await this.getDatabaseAccount();
  }


  private getDatabaseAccount = async () => {
    const userInfoUrl = "https://apipolaroid.azurewebsites.net/api/UserItems/byEmail/" + localStorage.getItem("userInfo.email")
    const response = await fetch(userInfoUrl, { method: 'GET' });
    const json = await response.json;

    const loadedProfile = json[0]
    if (loadedProfile === undefined) {
      console.log("No user Profile found on server")
    } else {
      localStorage.setItem("userItem.username", loadedProfile.username)
      localStorage.setItem("userItem.bio", loadedProfile.bio)
      localStorage.setItem("userItem.id", loadedProfile.id)
      this.setState((previousState: any, currentProps: any) => {
        return { ...previousState, haveCompletedProfile: true }
      })
    }
    this.fetchPosts();
  }

  private fetchPosts = async () => {
    let allUsersIFollow;
    const userID = localStorage.getItem("userItem.id");
    const url = "https://apipolaroid.azurewebsites.net/api/Relationships/following/" + userID
    const followingResponse = await fetch(url, { method: 'GET' });
    const followingjson = await followingResponse.json;
    allUsersIFollow = followingjson

    console.log(allUsersIFollow)
    const urlGetPosts = "https://apipolaroid.azurewebsites.net/api/postitems"
    const response = await fetch(urlGetPosts, { method: 'GET' });
    const json = await response.json;

    // If no posts are returned, then set a default post that says that you dont follow anyone
    const firstPost = json[0]
    if (firstPost === undefined) {
      json[0] = {
        "id": 1,
        "userID": 1,
        "imageURL": "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg",
        "caption": "Welp! You aren't following anyone",
        "uploaded": "2018-11-21T22:29:49.778365",
        "likes": 0
      }
    }
    this.setState((previousState: any, currentProps: any) => {
      return { ...previousState, posts: json }
    })
  }

}
export default App;
