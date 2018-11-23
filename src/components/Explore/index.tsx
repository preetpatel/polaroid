import * as React from "react";
import { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import ExploreItems from '../ExploreItems';

interface IState {
    userAccounts: React.ReactChild[]
}
class Explore extends Component<{}, IState> {

    public constructor(props: any) {
        super(props)
        this.state = {
            userAccounts: [<div key={"0"} id={"0"} className="mt-3 loader" />]
        }
        this.fetchPostsForProfile();
    }

    public render() {
        require("src/components/Explore/Explore.css")
        return (
            <Router>
                <div className="container">
                    {this.state.userAccounts}
                </div>
            </Router>
        );
    }

    
    private fetchPostsForProfile = async () => {

        const urlGetUsers = "https://apipolaroid.azurewebsites.net/api/UserItems"
        const response = await fetch(urlGetUsers, { method: 'GET' });
        const json = await response.json();

        const firstPost = json[0]
        if (firstPost === undefined) {
            json[0] = {
                "name": "Pineapple Seed",
                "id": 1,
                "username": "seed",
                "avatarURL": "https://www.pabulum-catering.co.uk/wp-content/uploads/2018/02/apple-touch-icon-152x152.png",
                "bio": "Leave me alone. I'm just seeding",
            }
        }

        const accountsCollection: React.ReactChild[] = []
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < json.length; i++) {
            accountsCollection.push(
                <div>
                    <ExploreItems userID={json[i].id} userName={json[i].name} userUserName={json[i].username} userAvatarUrl={json[i].avatarURL} userBio={json[i].bio} />
                </div>
            )
        }
        this.setState({
            userAccounts: accountsCollection
        })

    }
}

export default (Explore);