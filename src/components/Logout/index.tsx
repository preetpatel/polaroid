import * as React from "react";
import {Component} from 'react';
import LoginHOC from 'react-facebook-login-hoc';
import {BrowserRouter as Router, withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


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
        <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h2 className="card-title text-center"><strong>Thanks from Polaroid</strong></h2>
                                    <p className="text-center">Come back soon!</p>
                                    <div className="form-signin">
                                        <hr className="my-4" />
                                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" onClick={this.logoutFacebook}><FontAwesomeIcon icon={faSignOutAlt}/> Confirm Sign out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Router>
      );
    }
  }
   
  export default withRouter(LoginHOC(configureLoginProps)(Logout));