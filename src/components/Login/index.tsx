import * as React from "react";
import { Component } from 'react';
import LoginHOC from 'react-facebook-login-hoc';
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquare } from '@fortawesome/free-solid-svg-icons'

let cssLoaded = false;

const configureLoginProps = {
    scope: 'public_profile',
    xfbml: false,
    cookie: false,
    version: 2.6,
    language: 'en_US',
    appId: '820688131602902',
}

interface IProps {
    fb: any,
    history: any

}

class Login extends Component<IProps, {}> {
    public status: any
    public login: any
    public logout: any

    constructor(props: any) {
        super(props)
        this.status = this.props.fb.status
        this.login = this.props.fb.login
        this.logout = this.props.fb.logout

        const userData = localStorage.getItem("userData")
        if (userData != null) {
            const userDataJSON = JSON.parse(userData)
            if (userDataJSON.userName != null) {
                this.props.history.push("/");
            }
        }
    }

    public getStatus = (response: any) => {
        console.log(response)
        if (response.authResponse) {
            this.responseApi.call(this, response.authResponse)
        }
    }
    public responseApi = async (res: any) => {

        const userData = ({
            id: null,
            name: null,
            userName: null,
            email: null,
            avatarUrl: null,
            bio: null
        })

        const accessToken = res.accessToken
        const userInfoUrl = "https://graph.facebook.com/me?fields=name,email,picture.height(152)&access_token=" + accessToken
        const response = await fetch(userInfoUrl, { method: 'GET' });
        const json = await response.json();
        userData.email = json.email
        userData.name = json.name
        userData.avatarUrl = json.picture.data.url

        if (json.email === undefined) {
            localStorage.clear()
            this.props.history.push("/login")
        }

        const userInfoFromAPI = "https://apipolaroid.azurewebsites.net/api/UserItems/byEmail/" + userData.email
        const responseFromAPI = await fetch(userInfoFromAPI, { method: 'GET' });
        const jsonFromAPI = await responseFromAPI.json();

        const loadedProfile = jsonFromAPI[0]
        if (loadedProfile === undefined) {
            console.log("No user Profile found on server. Sending for user creation")
            localStorage.setItem("userData", JSON.stringify(userData))
            this.props.history.push("/completeregistration")
        } else {
            userData.id = jsonFromAPI[0].id
            userData.bio = jsonFromAPI[0].bio
            userData.userName = jsonFromAPI[0].username
            console.log(userData)
            localStorage.setItem("userData", JSON.stringify(userData))
            this.props.history.push("/")
        }


    }
    public checkLoginState = () => {
        this.status(this.getStatus.bind(this))
    };
    public loginFacebook = () => {
        this.login(this.getStatus.bind(this))
    }
    public logoutFacebook = () => {
        this.logout()
    }
    public render() {
        if (cssLoaded === false) {
            cssLoaded = true;
            require('src/components/Login/Login.css');
        }
        return (
            <Router>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h2 className="card-title text-center"><strong>Welcome To Polaroid</strong></h2>
                                    <p className="text-center">Share Memories & Connect With Friends</p>
                                    <div className="form-signin">
                                        <hr className="my-4" />
                                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" onClick={this.loginFacebook}><FontAwesomeIcon icon={faPhoneSquare}/> Sign in with Facebook</button>
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

export default withRouter(LoginHOC(configureLoginProps)(Login));