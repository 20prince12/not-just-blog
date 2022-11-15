import './App.css';
import {Component} from "react";
import 'whatwg-fetch';
import Main from '../Main'
import Header from '../Header'

class App extends  Component {

  render() {
    return (
        <div className="App">
        <Main />
        </div>
    );
  }
}

export default App;
