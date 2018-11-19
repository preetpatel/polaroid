import * as React from 'react';
import {Component} from 'react';
import "./Post.css"

interface IProps {
	nickname: any,
	avatar: any,
	image: any,
	caption: any
}

class Post extends Component<IProps, {}> {
        private myRef:any;
        constructor(props:any) {
            super(props)
            this.myRef= "Post";
        }
      public render() {
        const nickname = this.props.nickname;
        const avatar = this.props.avatar;
        const image = this.props.image;
        const caption = this.props.caption;
        return <article className="Post" ref={this.myRef}>
            <header>
              <div className="Post-user">
                <div className="Post-user-avatar">
                  <img src={avatar} alt={nickname} />
                </div>
                <div className="Post-user-nickname">
                  <span>{nickname}</span>
                </div>
              </div>
            </header>
            <div className="Post-image">
              <div className="Post-image-bg">
                <img alt={caption} src={image} />
              </div>
            </div>
            <div className="Post-caption">
              <strong>{nickname}</strong> {caption}
            </div>
          </article>;
        }
    }
    export default Post;