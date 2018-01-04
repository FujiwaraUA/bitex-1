import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {res: []};
    this.url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10&convert=EUR'
    this.request = require('request')

    this.getAPI = this.getAPI.bind(this);
  }

  componentDidMount() {
    this.getAPI();
    setInterval(() => {
      this.getAPI();
    }, 11000);
  }

  getAPI () {
    this.request.get(this.url,(error, response, body) => {
      this.setState({res: JSON.parse(body)});
      console.log(this.state.res);
    })

  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />



      </header>
      {this.state.res.map(function(item, i){
        return(
          <div key={i} className="App-intro">
          <div className="ga-inline-block">
          {item.name}
          </div>
          <div className="ga-inline-block">
          {parseFloat(item.price_usd).toFixed(2) } USD
          </div>
          <div className="ga-inline-block">
          {parseFloat(item.price_eur).toFixed(2) } EUR
          </div>
        </div>)
      })}
      </div>
    );
  }
}

export default App;
