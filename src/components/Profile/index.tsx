import * as React from "react";
import { Component } from 'react';
import * as RouteComponent from 'react-router-dom'
import * as queryString from 'query-string'
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Input, FormFeedback, Button } from 'reactstrap';




interface IProps {
    location: any
    history: any
}

interface IState {
    id: any,
    name: any,
    bio: any,
    username: any,
    avatarURL: any
    postCount: any,
    followerCount: any,
    followingCount: any,
    posts: React.ReactChild[],
    hasAdminPrivileges: boolean,
    open: any,
    email: any,
    usernameValid: any,
    userNameTemp: any,
    userBioTemp: any,
    isFollowing: boolean,
    relationshipID: any
}

class Profile extends Component<IProps, IState>{
    public constructor(props: any) {
        super(props)

        const userData = localStorage.getItem("userData")
        if (userData != null) {
            const userDataJSON = JSON.parse(userData);
            this.state = ({
                id: userDataJSON.id,
                name: userDataJSON.name,
                bio: userDataJSON.bio,
                username: userDataJSON.userName,
                avatarURL: userDataJSON.avatarUrl,
                email: userDataJSON.email,
                postCount: 0,
                followerCount: 0,
                followingCount: 0,
                posts: [<div key={"0"} id={"0"} className="loader" />],
                hasAdminPrivileges: true,
                open: false,
                usernameValid: 'has-danger',
                userNameTemp: "",
                userBioTemp: "",
                isFollowing: false,
                relationshipID: 0
            })
        }
        this.fetchPostsForProfile();
    }

    public componentWillMount = async () => {
        const values = queryString.parse(this.props.location.search)
        if (values.id != null) {
            if (parseInt(values.id[0], 10) === parseInt(this.state.id, 10)) {
                this.props.history.push("/profile")
            }

            const getRelationshipUrl = "https://apipolaroid.azurewebsites.net/api/Relationships/person/" + this.state.id + "/follows/" + values.id
            console.log(getRelationshipUrl)
            try {
                fetch(getRelationshipUrl, {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json[0] !== undefined) {
                            console.log("whoops " + json)
                            this.setState({
                                isFollowing: true,
                                relationshipID: json[0].id
                            })
                        }
                    });
            } catch (error) {
                // Do nothing since isFollowing is set to false in constructor
            }

            // Gets user data
            const urlGetPosts = "https://apipolaroid.azurewebsites.net/api/UserItems/" + values.id
            try {
                fetch(urlGetPosts, {
                    method: 'GET'
                })
                    .then(res => res.status)
                    .then(status => {
                        if (status === 200) {
                            fetch(urlGetPosts, {
                                method: 'GET'
                            })
                                .then(res => res.json())
                                .then(json => {
                                    this.setState({
                                        id: json.id,
                                        name: json.name,
                                        bio: json.bio,
                                        username: json.username,
                                        avatarURL: json.avatarURL,
                                        email: json.email,
                                        hasAdminPrivileges: false
                                    }, this.fetchPostsForProfile)
                                });
                        } else {
                            this.props.history.push("/")
                        }
                    });
            } catch (error) {
                this.props.history.push("/")
            }

        }
    }

    public render() {
        require('./Profile.css');
        const { open } = this.state;
        let editButton = (
            <div className="profile-user-settings">
                <h1 className="profile-user-name">{this.state.username}</h1>
            </div>
        )
        if (this.state.hasAdminPrivileges) {
            editButton = (
                <div className="profile-user-settings">
                    <h1 className="profile-user-name">{this.state.username}</h1>
                    <div>
                        <button className="btn profile-edit-btn" onClick={this.onOpenModal}>Edit Profile</button>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <div className="form pt-3">
                                <h2>Edit your profile</h2>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input className="form-control"
                                            type="email"
                                            name="email"
                                            id="userEmail"
                                            disabled
                                            placeholder={this.state.email}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Username</label>
                                    <div className="col-sm-10">
                                        <Input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder={this.state.username}
                                            valid={this.state.usernameValid === 'has-success'}
                                            invalid={this.state.usernameValid === 'has-danger'}
                                            onChange={(e) => {
                                                this.validateUsername(e)
                                            }}
                                        />
                                        <FormFeedback valid>
                                            That's a tasty looking username you've got there! I just need an oven!
                                        </FormFeedback>
                                        <FormFeedback invalid>
                                            Uh oh! Looks like that username is taken or is invalid. Try another one!
                                        </FormFeedback>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Bio</label>
                                    <div className="col-sm-10">
                                        <input className="form-control"
                                            type="text"
                                            name="bio"
                                            id="bio"
                                            placeholder={this.state.bio}
                                            onChange={(e) => {
                                                this.updateBioState(e)
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                            <Button onClick={this.submitForm}>Update Profile</Button>
                        </Modal>
                    </div>
                    <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="false" /></button>
                </div>
            )
        } else {
            if (this.state.isFollowing) {
                editButton = (
                    <div className="profile-user-settings">
                        <h1 className="profile-user-name">{this.state.username}</h1>
                        <button className="btn profile-edit-btn" onClick={this.unFollowHandler} >Unfollow</button>
                    </div>
                )
            } else {
                editButton = (
                    <div className="profile-user-settings">
                        <h1 className="profile-user-name">{this.state.username}</h1>
                        <button className="btn profile-edit-btn" onClick={this.followHandler} >Follow</button>
                    </div>
                )
            }
        }

        return (
            <div className="Profile-view">
                <header>
                    <div className="container">
                        <div className="profile">
                            <div className="profile-image">
                                <img src={this.state.avatarURL} alt="" />
                            </div>
                            {editButton}

                            <div className="profile-stats">
                                <ul>
                                    <li><span className="profile-stat-count">{this.state.postCount}</span> posts</li>
                                    <li><span className="profile-stat-count">{this.state.followerCount}</span> followers</li>
                                    <li><span className="profile-stat-count">{this.state.followingCount}</span> following</li>
                                </ul>
                            </div>
                            <div className="profile-bio">
                                <p><span className="profile-real-name">{this.state.name}</span> {this.state.bio}</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    <div className="container">
                        <div className="gallery">
                            {this.state.posts}
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    public handleClose = () => {
        console.log("Logout")
    }

    public onOpenModal = () => {
        this.setState({ open: true });
    };

    public onCloseModal = () => {
        this.setState({ open: false });
    };

    // Checks to see if username already exists or not
    public validateUsername = (e: any) => {
        let userField: string = e.target.value;
        userField = userField.toLowerCase();
        const userNameValidateURL = "https://apipolaroid.azurewebsites.net/api/UserItems/byUsername/" + userField
        fetch(userNameValidateURL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => {
                if (json[0] == null && userField.length > 3 || userField === this.state.username) {
                    this.setState({
                        usernameValid: 'has-success',
                        userNameTemp: userField
                    })
                } else {
                    this.setState({
                        usernameValid: 'has-danger',
                        userNameTemp: userField
                    })
                }

            });
    }

    public trackBio = (e: any) => {
        this.setState({
            userBioTemp: e.target.value
        })
    }

    public submitForm = (e: any) => {
        e.preventDefault();
        if (this.state.usernameValid === "has-success") {

            const editedUser = {
                id: this.state.id,
                name: this.state.name,
                username: this.state.userNameTemp,
                email: this.state.email,
                avatarUrl: this.state.avatarURL,
                bio: this.state.userBioTemp
            }
            const url = "https://apipolaroid.azurewebsites.net/api/UserItems/" + this.state.id
            console.log(JSON.stringify(editedUser))
            fetch(url, {
                body: JSON.stringify(editedUser),
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
                .then((response: any) => {
                    if (!response.ok) {
                        // Error State
                        alert(response.statusText)
                    } else {
                        this.setState({
                            username: this.state.userNameTemp,
                            bio: this.state.userBioTemp,
                            open: false
                        })
                        const userData = localStorage.getItem("userData")
                        if (userData != null) {
                            const userDataJSON = JSON.parse(userData)
                            userDataJSON.userName = this.state.userNameTemp
                            userDataJSON.bio = this.state.userBioTemp
                            localStorage.setItem("userData", JSON.stringify(userDataJSON))
                        }
                        this.props.history.push("/profile")
                    }
                })
        }
    }

    public updateBioState = (e: any) => {
        this.setState({
            userBioTemp: e.target.value
        })
    }

    public followHandler = async () => {
        
        const userData = localStorage.getItem("userData")
        if (userData != null) {
            const userDataJSON = JSON.parse(userData)
            if (userDataJSON.id !== null) {   
                const formData = new FormData()
                formData.append("Person", userDataJSON.id)
                formData.append("Follows", this.state.id)
                const urlFollow = "https://apipolaroid.azurewebsites.net/api/Relationships"
                const response = await fetch(urlFollow, {
                body: formData,
                headers: { 'cache-control': 'no-cache' },
                method: 'POST'
                })
                const json = await response.json();
                console.log(json)
                this.setState({
                    relationshipID: json.id,
                    isFollowing: true 
                })
            }
        }    
    }

    public unFollowHandler = async () => {
        if (this.state.relationshipID !== null) {
            const urlUnfollow = "https://apipolaroid.azurewebsites.net/api/Relationships/" + this.state.relationshipID
            const response = await fetch(urlUnfollow, {method: 'DELETE'})
            console.log(await response.json())
            this.setState({
                isFollowing: false,
                relationshipID: null
            })
        }
    }

    private fetchPostsForProfile = async () => {

        const urlGetPosts = "https://apipolaroid.azurewebsites.net/api/PostItems/filter/" + this.state.id
        const response = await fetch(urlGetPosts, { method: 'GET' });
        const json = await response.json();

        this.setState({
            postCount: json.length
        })

        const firstPost = json[0]
        if (firstPost === undefined) {
            json[0] = {
                "id": 1,
                "userID": 1,
                "imageURL": "https://www.dailydot.com/wp-content/uploads/e52/31/87610fa1a0ae891d.png",
                "caption": "Welp! You haven't posted anything",
                "uploaded": "2018-11-21T22:29:49.778365",
                "likes": 0
            }
        }

        const postsCollection: React.ReactChild[] = []
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < json.length; i++) {
            postsCollection.push(
                <div className="gallery-item" >
                    <img src={json[i].imageURL} className="gallery-image" alt={json[i].caption} />
                    <div className="gallery-item-info">
                        <ul>
                            <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><FontAwesomeIcon icon={faHeart} aria-hidden="true" /> {json[i].likes}</li>
                        </ul>
                    </div>
                </div>
            )
        }
        this.setState({
            posts: postsCollection
        })

        const urlGetFollowers = "https://apipolaroid.azurewebsites.net/api/Relationships/followers/" + this.state.id
        const responseForFollowers = await fetch(urlGetFollowers, { method: 'GET' });
        const jsonForFollowers = await responseForFollowers.json();
        this.setState({
            followerCount: jsonForFollowers.length
        })

        const urlGetFollowing = "https://apipolaroid.azurewebsites.net/api/Relationships/following/" + this.state.id
        const responseForFollowing = await fetch(urlGetFollowing, { method: 'GET' });
        const jsonForFollowing = await responseForFollowing.json();
        this.setState({
            followingCount: jsonForFollowing.length
        })

    } 

}
export default RouteComponent.withRouter(Profile);