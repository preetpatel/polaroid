import * as React from 'react';
import { Component } from 'react';
import "./Post.css"

interface IProps {
  id: any,
  username: any,
  avatar: any,
  image: any,
  caption: any,
  likes: any,
  uploadedDate: any,
  email: any
}

interface IState {
  likes: any
  photoLiked: boolean
}

class Post extends Component<IProps, IState> {
  private myRef: any;
  constructor(props: any) {
    super(props)
    this.state = {
      likes: this.props.likes,
      photoLiked: false
    }
    this.myRef = "Post";
  }
  public render() {
    const username = this.props.username;
    const avatar = this.props.avatar;
    const image = this.props.image;
    const caption = this.props.caption;
    const likes = this.state.likes;

    return <article className="Post" ref={this.myRef}>
      <header>
        <div className="Post-user">
          <div className="Post-user-avatar">
            <img src={avatar} alt={username} />
          </div>
          <div className="Post-user-username">
            <span>{username}</span>
          </div>
        </div>
      </header>
      <div className="Post-image">
        <div className="Post-image-bg">
          <img alt={caption} src={image} onDoubleClick={this.handleDoubleClick} />
        </div>
      </div>
      <div className="Post-caption">
        <strong>{username}</strong> {caption}
        <div className="float-right">
          <img className="Like-image" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Love_Heart_symbol.svg" /> {likes}
        </div>
      </div>
    </article>;
  }

  public handleDoubleClick = (event: any) => {
    if (!this.state.photoLiked) {
       this.setState({
        likes: this.state.likes + 1,
        photoLiked: true
      }, this.updateLikeCount)
    }
  }

  private updateLikeCount = () => {
    const thisPost = {
      id: this.props.id,
      username: this.props.username,
      imageURL: this.props.image,
      caption: this.props.caption,
      uploaded: this.props.uploadedDate,
      likes: this.state.likes,
      email: this.props.email,
      avatarURL: this.props.avatar

    }

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