import * as React from "react";
import {Component} from 'react';
import LoginHOC from 'react-facebook-login-hoc';
import {BrowserRouter as Router, withRouter} from 'react-router-dom'

const configureLoginProps = {
    scope: 'public_profile',
    xfbml: false,
    cookie: false,
    version: 2.6,
    language: 'en_US',
    appId: '820688131602902'
  }

  interface IProps {
      fb: any,
      history: any
  }
   
  class Logout extends Component<IProps, {}> {
      public status: any
      public login: any
      public logout: any

    constructor(props : any) {
      super(props)

      this.status = this.props.fb.status
      this.login = this.props.fb.login
      this.logout = this.props.fb.logout
    }
    public getStatus = (response: any) => {
      if (response.authResponse) {
        this.responseApi.call(this, response.authResponse)
      } 
    }
    public responseApi = (res: any) => {
      console.log('token:', res)
    }
    public checkLoginState = () => {
      this.status(this.getStatus.bind(this))
    };
    public loginFacebook = () => {
      this.login(this.getStatus.bind(this))
    }
    public logoutFacebook = () => {
      this.logout()
      localStorage.clear()
      this.props.history.push("/login")
    }
    public render() {
      return (
          <Router>
        <div>
          <button onClick={ this.logoutFacebook }>Confirm logout</button>
        </div>
        </Router>
      );
    }
  }
   
  export default withRouter(LoginHOC(configureLoginProps)(Logout));