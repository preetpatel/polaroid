import * as React from "react";
import { Component } from 'react';
import "src/components/ProfilePosts/ProfilePosts.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

interface IProps {
    userID: any
}

interface IState {
    posts: React.ReactChild[]
}

class ProfilePosts extends Component<IProps,IState>{

    public constructor(props: any) {
        super(props)
        this.state = ({
            posts: [<div key={"-1"} id={"0"} className=" container pb-4 loader"/>],
            })

        this.fetchPosts();
    }

    public render() {
        return (
            <div className="container">
                        <div className="gallery">
                            {this.state.posts}
                        </div>
                    </div>
        )
    }

    private fetchPosts = async () => {

        const urlGetPosts = "https://apipolaroid.azurewebsites.net/api/PostItems/filter/" + this.props.userID
        console.log(urlGetPosts)
        const response = await fetch(urlGetPosts, { method: 'GET' });
        const json =  await response.json();
        
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
                                        <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><FontAwesomeIcon icon={faHeart} aria-hidden="true" /> {json[0].likes}</li>
                                    </ul>
                                </div>
                            </div>
             )
         }
         this.setState({
            posts: postsCollection
        })
      }
}
export default ProfilePosts