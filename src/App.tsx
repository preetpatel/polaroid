import * as React from 'react';
import {Component} from 'react';
import './App.css';
import Header from './components/Header/index';
import Posts from './components/Posts/index';
import FacebookLogin from 'react-facebook-login';

interface IState {
  posts: any[],
  userEmail: any,
  userName: any,
  userAvatar: any,
  isLoggedIn: boolean,
}
class App extends Component<{},IState> {
  public constructor(props:any){
    super(props)
    this.state= {
      isLoggedIn: false,
      posts: [{"username":"Chris", "avatar":"https://www.laravelnigeria.com/img/chris.jpg", "caption":"Loading posts", "image":"https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg", "likes": "0"}],
      userEmail: null,
      userName: null,
      userAvatar: "https://www.laravelnigeria.com/img/chris.jpg"
    }
    this.fetchMemes = this.fetchMemes.bind(this)
    this.fetchMemes()
  }
  public render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (<div>
        <Header avatar={this.state.userAvatar} name={this.state.userName}/>
        <div className="pb-3"/>
        <Posts posts={this.state.posts}/>
      </div>);
    } else {
      fbContent = (
        <FacebookLogin
        appId="820688131602902"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
      )
    }
    return (
      <div>
        {fbContent}
      </div>
    );
  }

  public responseFacebook = (response:any) => {
    this.setState({
      userEmail: response.email,
      userAvatar: response.picture.data.url,
      userName: response.name,
      isLoggedIn: true
    })
  }

  private fetchMemes() {
		const url = "https://apipolaroid.azurewebsites.net/api/postitems"
		fetch(url, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(json => {
				let currentMeme = json[0]
				if (currentMeme === undefined) {
					currentMeme = { "id": 0, "title": "No memes (╯°□°）╯︵ ┻━┻", "url": "", "tags": "try a different tag", "uploaded": "", "width": "0", "height": "0" }
				}
				this.setState({
          posts: json
        })
			});
	}

}
export default App;
