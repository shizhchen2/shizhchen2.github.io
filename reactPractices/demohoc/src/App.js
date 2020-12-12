import React from 'react';
import './App.css';
import Chosen from './components/Chosen';
class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      choosenValue:""
    }
    this.handleChosenChange = this.handleChosenChange.bind(this)
  }
  
  handleChosenChange(value){
    this.setState({
      choosenValue:value
    })
  }
  
  render(){



    return (
      <div className="App">
        <Chosen onChange={this.handleChosenChange}>
          <option>apple</option>
          <option>orange</option>
          <option>cake</option>
        </Chosen>
        <div>
        {this.state.choosenValue}
        </div>
      </div>

    );
  }
}

export default App;
