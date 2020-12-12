import React,{Component} from 'react';

import './App.css';
import Board from './components/Board';
import PlayerInfo from './components/PlayerInfo';
import History from './components/History';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      squares:new Array(9).fill(null),
      stepCount:0,
      history:[],
    
    }
  }

  calcSquares(history,stepCount){
    
    const squaresNew = new Array(9).fill(null);

    for(let i=0;i<stepCount;i++){
      let curHistory = history[i];
      squaresNew[curHistory.pos] = curHistory.player
    }
    return squaresNew;
  }

  handleClickSquare=(pos,info)=>{
    let {result} = this.isWin();
    if(result){
      return ;
    }
    if(info==null){
      const {history} = this.state;



      const historyNew = [...history.slice(0,this.state.stepCount),
        {
        stepCount:this.state.stepCount,
        player:this.getCurrentPlayer(),
        pos:pos,
      }]
      this.setState((prevState)=>({
        history:historyNew,
        stepCount:prevState.stepCount+1,
        squares:this.calcSquares(historyNew,prevState.stepCount+1)
      }))
    }
  }

  handleHistoryClick=(historyItem)=>{
    this.setState((prevState)=>({
      stepCount:historyItem.stepCount+1,
      squares:this.calcSquares(prevState.history,historyItem.stepCount+1)
    }))
  }

  isWin(){
    let result = false;
    let winPlayer = null;
    const {squares} = this.state;

    const winConditions = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],
    ]
    for(let i=0;i<winConditions.length;i++){
      let curCondition = winConditions[i];
      let first = squares[curCondition[0]]
      let second = squares[curCondition[1]]
      let third = squares[curCondition[2]]
      if(first!=null&&first===second&&second===third){
        result = true;
        winPlayer = first
        break;
      }
    }


    return {
      result:result,
      winPlayer:winPlayer
    }
  }

  handleRestartGame=()=>{
    this.setState((prevState)=>({
      stepCount:0,
      squares:this.calcSquares(prevState.history,0)
    }))
  }

  getCurrentPlayer(){
    const {stepCount}= this.state;
    return stepCount%2==0?"X":"O"
  }

  render(){
    return (
      <div className="App">
        <div className="leftPanel">
          <Board squares={this.state.squares} onClickSquare={this.handleClickSquare}/>
        </div>
        <div className="rightPanel">
          <PlayerInfo 
          winResult={this.isWin()}
          curPlayer={this.getCurrentPlayer()} />
          <History 
          history={this.state.history}onClickHistory={this.handleHistoryClick} onRestartGame={this.handleRestartGame}/>
        </div>
      </div>
    );
  }
}

export default App;
