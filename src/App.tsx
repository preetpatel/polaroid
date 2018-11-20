import * as React from 'react';
import {Component} from 'react';
import './App.css';
import Header from './components/Header/index';
import Posts from './components/Posts/index';
import FacebookLogin from 'react-facebook-login';

interface IState {
	posts: any[],
}
class App extends Component<{},IState> {
  public constructor(props:any){
    super(props)
    this.state= {
      posts: [{"username":"Chris", "avatar":"https://www.laravelnigeria.com/img/chris.jpg", "caption":"Loading posts", "image":"https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg", "likes": "0"}]
    }
    this.fetchMemes = this.fetchMemes.bind(this)
    this.fetchMemes()
  }
  public render() {
    return (
      <div>
        <Header/>
        <FacebookLogin
        appId="820688131602902"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
        <div>
          <Posts posts={this.state.posts}/>
        </div>
      </div>
    );
  }

  public responseFacebook(response: any) {
    console.log(response)
  }

  private fetchMemes() {
		const url = "http://polaroidappapi.azurewebsites.net/api/postitems"
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
