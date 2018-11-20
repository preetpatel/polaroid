import * as React from 'react';
import {Component} from 'react';
import Post from '../Post/index';

interface IProps {
    posts: any[],
}

class Posts extends Component<IProps, {}> {
    public constructor(props:any) {
        super(props)
        this.createPosts = this.createPosts.bind(this)
    }

    public render() {
        return <div>
            {this.createPosts()}
        </div>
    }

    private createPosts() {
        const postsCollection:any[] = []
        const postList = this.props.posts
        if (postList == null) {
            return <Post username="Loading" avatar="https://www.laravelnigeria.com/img/chris.jpg" caption="No Posts Found" image="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg" likes='0'/>
        }

        // tslint:disable-next-line:prefer-for-of
         for (let i = 0; i < postList.length; i++) {
             const currentPost = postList[i];
             postsCollection.push(<div key={i+""} id={i+""}><Post username={currentPost.username} avatar="https://image.flaticon.com/icons/svg/168/168724.svg" caption={currentPost.caption} image={currentPost.imageURL} likes={currentPost.likes}/></div>)
         }
        return postsCollection
    }
}
export default Posts;