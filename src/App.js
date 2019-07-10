import React from 'react';
import './App.css';

class App extends React.PureComponent {
  state = { 
    restaurant: null,
    recipes: [],
    user: null
   }

  async componentDidMount() {
    let recipes = await fetch('/api/recipes').then(res => res.json());
    this.setState({ recipes });
  }

  render() { 
    return ( 
      <h1 className="App">Welcome to Recipyeet, {this.state.user}</h1>
     );
  }
}
 
export default App;
