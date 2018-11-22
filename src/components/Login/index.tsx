import * as React from "react";
import { Component } from 'react';
import LoginHOC from 'react-facebook-login-hoc';
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

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

class Login extends Component<IProps, {}> {
    public status: any
    public login: any
    public logout: any

    constructor(props: any) {
        super(props)
        this.status = this.props.fb.status
        this.login = this.props.fb.login
        this.logout = this.props.fb.logout

        if(localStorage.getItem("userData") != null) {
            this.props.history.push("/");
        }
    }

    public getStatus = (response: any) => {
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

        const accessToken =  res.accessToken
        const userInfoUrl = "https://graph.facebook.com/me?fields=name,email,picture.height(152)&access_token=" + accessToken
        const response = await fetch(userInfoUrl, { method: 'GET' });
        const json = await response.json();
        userData.email =  json.email
        userData.name =  json.name
        userData.avatarUrl = json.picture.data.url

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
        return (
            <Router>
                <div>
                    <button onClick={this.loginFacebook}>Facebook Login</button>
                    <button onClick={this.checkLoginState}>Check Login</button>
                </div>
            </Router>
        );
    }
}

export default withRouter(LoginHOC(configureLoginProps)(Login));