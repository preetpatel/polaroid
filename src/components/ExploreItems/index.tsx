import * as React from "react";
import { Component } from 'react';

interface IProps {
    userID: any,
    userName: any,
    userUserName: any,
    userAvatarUrl: any,
    userBio: any
}
class ExploreItems extends Component<IProps, {}> {

    public constructor(props: any) {
        super(props)
    }

    public render() {
        require("src/components/ExploreItems/ExploreItems.css")
        return (
            <a style={{textDecoration: 'none', color:'black'}} href={"/profile?id=" + this.props.userID} className="card card-signin mt-3">
                <div className="user-profile mt-3">
                    <img className="avatar" src={this.props.userAvatarUrl} alt="Ash" />
                    <div className="username">{this.props.userUserName}</div>
                    <div className="bio">
                        {this.props.userName}
                    </div>
                    <div className="description">
                        {this.props.userBio}
                     </div>
                </div>
            </a>
        )
    }
}

export default ExploreItems;