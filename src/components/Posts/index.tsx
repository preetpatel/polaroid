import * as React from 'react';
import {Component} from 'react';
import Post from '../Post/index';
import { withRouter } from 'react-router-dom'
import "./Posts.css"

interface IProps {
    history: any,
}

interface IState {
    posts: React.ReactChild[],
    userData: any
}

class Posts extends Component<IProps, IState> {
    public constructor(props:any) {
        super(props)
        this.state = ({
            posts: [<div key={"-1"} id={"0"} className=" container pb-4 loader"/>],
                userData: null
            })

        const userData = localStorage.getItem("userData")
        if (userData !== null) {
            const userDataJSON = JSON.parse(userData)
            if (userDataJSON.userName === null) {
                this.props.history.push("/login");
                return;
            } else {
                console.log("hmm not null")
                this.state = ({
                posts: [<div key={"-1"} id={"0"} className=" container pb-4 loader"/>],
                    userData: userDataJSON
                })
                this.fetchPosts();
            }
        } else {
            this.props.history.push("/login");
            return;
        }
    }

    public render = () => {
        return <div>
            { this.state.posts}
        </div>
    }

    private fetchPosts = async () => {
        const userID = this.state.userData.id
        const url = "https://apipolaroid.azurewebsites.net/api/Relationships/following/" + userID
        const followingResponse = await fetch(url, { method: 'GET' });
        const followingjson = await followingResponse.json();
    
        let queryString: string = "?";
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < followingjson.length; i++) {
            queryString = queryString + "UserID=" +  followingjson[i].follows + "&"
        }
        console.log("Query String for posts: " + queryString)

        const urlGetPosts = "https://apipolaroid.azurewebsites.net/api/PostItems/filterall" + queryString
        const response = await fetch(urlGetPosts, { method: 'GET' });
        const json =  await response.json();
    
        // If no posts are returned, then set a default post that says that you dont follow anyone
        const firstPost = json[0]
        if (firstPost === undefined) {
          json[0] = {
            "id": null,
            "userID": "",
            "imageURL": "https://sophosnews.files.wordpress.com/2015/09/shutterstock_289142876.jpg?w=780&h=408&crop=1",
            "caption": "Welp! You aren't following anyone. You can explore users from the button above",
            "uploaded": "2018-11-21T22:29:49.778365",
            "likes": 0
          }
        }
        console.log(json)
        const postsCollection: React.ReactChild[] = []
        postsCollection.push(<div key="-1" id="spacer" className="pb-4"/>)
        // tslint:disable-next-line:prefer-for-of
         for (let i = 0; i < json.length; i++) {
             postsCollection.push(<div key={i+""} id={i+""}><Post id={json[i].id} uploadedDate={json[i].uploaded} userID={json[0].userID} caption={json[i].caption} imageUrl={json[i].imageURL} likes={json[i].likes}/></div>)
         }
         this.setState({
            posts: postsCollection
        })
      }
}
export default withRouter(Posts);