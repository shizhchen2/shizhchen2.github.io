import React,{Component} from 'react';
import MyButton from './components/MyButton'
import './App.css';

class App extends Component {
  handleClickMyButton=()=>{
    alert('jb');
  }
  render(){
  return (
    <div className="App">
      <h1>asdfasdfa</h1>
      <MyButton onClick={this.handleClickMyButton} />
    </div>
    );
  }
}

export default App;
