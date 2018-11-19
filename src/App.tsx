import * as React from 'react';
import {Component} from 'react';
import './App.css';
import Header from './components/Header/index';
import Post from './components/Post/index';
class App extends Component {
  public render() {
    return (
      <div>
        <Header/>
        <div>
          <Post username="Chris" avatar="https://www.laravelnigeria.com/img/chris.jpg" caption="Moving the community!" image="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg" likes='0'/>
        </div>
      </div>
    );
  }
}
export default App;
