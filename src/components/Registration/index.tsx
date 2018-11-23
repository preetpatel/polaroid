import * as React from "react";
import { Redirect } from 'react-router-dom'
import {
    Container, Col,
    FormGroup, Label, Input,
    Button, FormFeedback
} from 'reactstrap';

interface IState {
    usernameValid: any
    userName: any,
    bio: any,
    name: any,
    email: any,
    avatarUrl: any,
    registrationComplete: boolean
}
class Registration extends React.Component<{}, IState>{

    public constructor(props: any) {
        super(props)

        const userData = localStorage.getItem("userData");
        if (userData != null) {
            const userDataJSON = JSON.parse(userData)
            this.state = {
                usernameValid: "",
                bio: "",
                userName: "" ,
                name: userDataJSON.name,
                email: userDataJSON.email,
                avatarUrl: userDataJSON.avatarUrl,
                registrationComplete: false, 
            } 
        } else {
            this.state = {
                usernameValid: "",
                bio: "",
                userName: "" ,
                name: "",
                email: "",
                avatarUrl: "",
                registrationComplete: true, 
            } 
        }
    }

    public render() {
        require('./Registration.css');
        let redirection;
        if (this.state.registrationComplete) {
            redirection = (<Redirect to="/login"/> )
        }
        return (
            <Container className="App pt-3">
                {redirection}
                <div className="">
                    <h2>Hey, {this.state.name}!</h2>
                </div>
                <h3 className="text-center text-justify">We just need a few more details</h3>
                <div className="form">
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                disabled= {true}
                                placeholder={this.state.email}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Something catchy"
                                valid={this.state.usernameValid === 'has-success'}
                                invalid={this.state.usernameValid === 'has-danger'}
                                onChange={ (e) => {
                                    this.validateUsername(e)
                                  } }
                            />
                            <FormFeedback valid>
                                That's a tasty looking username you've got there.
                            </FormFeedback>
                            <FormFeedback invalid>
                                Uh oh! Looks like that username is taken or is invalid. Try another one!
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="username">Bio</Label>
                            <Input
                                type="text"
                                name="bio"
                                id="bio"
                                placeholder="Whats up with you?"
                                onChange={ (e) => {
                                    this.updateBioState(e)
                                  } }
                            />
                        </FormGroup>
                    </Col>
                    <Button onClick={this.submitForm}>Submit</Button>
                </div>
            </Container>
        )
    }

    public submitForm = (e:any) => {
        e.preventDefault();
        if (this.state.usernameValid === "has-success") {

            const formData = new FormData()
		    formData.append("username", this.state.userName)
            formData.append("name", this.state.name)
            formData.append("email", this.state.email)
            formData.append("avatarURL", this.state.avatarUrl)
            formData.append("bio", this.state.bio)
            const url = "https://apipolaroid.azurewebsites.net/api/UserItems"
            fetch(url, {
                body: formData,
                headers: { 'cache-control': 'no-cache' },
                method: 'POST'
            })
                .then((response: any) => {
                    if (!response.ok) {
                        // Error State
                        alert(response.statusText)
                    } else {
                      this.setState({
                          registrationComplete: true
                      })
                    }
                })
        }
      }

    public updateBioState = (e:any) => {
        this.setState({
            bio: e.target.value
        })
    } 


    // Checks to see if username already exists or not
    public validateUsername = (e:any) => {
        let userField: string = e.target.value;
        userField = userField.toLowerCase();
        const userNameValidateURL = "https://apipolaroid.azurewebsites.net/api/UserItems/byUsername/" + userField
    fetch(userNameValidateURL, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(json => {
				if (json[0] == null && userField.length > 3) {
					this.setState({
                        usernameValid: 'has-success',
                        userName : userField
                    })
				} else {
                    this.setState({
                        usernameValid: 'has-danger',
                        userName : userField
                    })
                }
				
			});
    }
}
export default Registration;