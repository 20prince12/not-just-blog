//import logo from '../public/images/logo.png';
import './App.css';
import {Component} from "react";
import 'whatwg-fetch';
import Blog from '../../containers/Blog'

class App extends  Component {

  render() {
    return (
        <div className="App">
        <Blog />
        </div>
    );
  }
}

export default App;
