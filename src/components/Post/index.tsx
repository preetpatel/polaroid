import * as React from 'react';
import { Component } from 'react';
import "./Post.css"
import { NavLink } from 'react-router-dom'


interface IProps {
  id: any,
  uploadedDate: any,
  caption: any,
  imageUrl: any,
  likes: string,
  userID: any,
}

interface IState {
  likes: any,
  username: any,
  avatarUrl: any,
  photoLiked: boolean,

}

class Post extends Component<IProps, IState> {
  private myRef: any;
  constructor(props: any) {
    super(props)
    this.state = {
      likes: this.props.likes,
      username: null,
      avatarUrl: null,
      photoLiked: false
    }
    this.myRef = "Post";
    this.getUserInfo();
  }
  public render() {
    const username = this.state.username;
    const avatar = this.state.avatarUrl;
    const image = this.props.imageUrl;
    const caption = this.props.caption;
    const likes = this.state.likes;

    return (
    <article className="Post" ref={this.myRef}>
    <div className="card card-signin">
      <header>
        <NavLink to={"/profile?id=" + this.props.userID} style={{textDecoration: 'none', color:'black'}} className="Post-user">
          <div className="Post-user-avatar">
            <img src={avatar} alt={username} />
          </div>
          <div className="Post-user-username">
            <span>{username}</span>
          </div>
        </NavLink>
      </header>
      <div className="Post-image">
        <div className="Post-image-bg">
          <img alt={caption} src={image} onDoubleClick={this.handleDoubleClick} />
        </div>
      </div>
      <div className="Post-caption Text-behave">
        <strong><NavLink to={"/profile?id=" + this.props.userID} style={{textDecoration: 'none', color:'black'}}>{username}</NavLink></strong> {caption}
        <div className="float-right">
          <img className="Like-image" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Love_Heart_symbol.svg" /> {likes}
        </div>
      </div>
      </div>
    </article>
    
    );
  }

  public handleDoubleClick = (event: any) => {
    if (!this.state.photoLiked) {
       this.setState({
        likes: this.state.likes + 1,
        photoLiked: true
      }, this.updateLikeCount)
    }
  }

  public getUserInfo = async () => {
    const urlGetPosts = "https://apipolaroid.azurewebsites.net/api/UserItems/" + this.props.userID
      const response = await fetch(urlGetPosts, { method: 'GET' });
      const json =  await response.json();

      this.setState((previousState: any, currentProps: any) => {
          return { ...previousState, 
            username: json.username,
            avatarUrl: json.avatarURL
          }
        })
  }

  private updateLikeCount = () => {
    const thisPost = {
      id: this.props.id,
      userID: this.props.userID,
      imageURL: this.props.imageUrl,
      caption: this.props.caption,
      uploaded: this.props.uploadedDate,
      likes: this.state.likes
    }

    console.log(thisPost)

    const url = "https://apipolaroid.azurewebsites.net/api/postitems/" + this.props.id
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(thisPost),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res;
    }).catch(err => {
      console.log(err)
    });
  }
}
export default Post;