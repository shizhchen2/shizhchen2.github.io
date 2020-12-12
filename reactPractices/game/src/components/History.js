import React,{Component} from 'react';
import './History.css';
class History extends Component{

    handleClick(item){
        const {onClickHistory} = this.props;
        if(onClickHistory){
            onClickHistory(item)
        }
    }

    genHistoryStart(){
        return (
            <li key={`history-item-start`}><button onClick={this.props.onRestartGame}>重新开始</button></li>
        )
    }

    render(){
        const {history} = this.props;
        if(history.length==0){
            return <div className="history">
            
        </div>
        }else{
            return (
                <div className="history">
                    <ul>
                        {this.genHistoryStart()}
                        {history.map((item,index)=>(
                            <li key={`history-item-${index}`}><button onClick={this.handleClick.bind(this,item)}>#{item.stepCount}:棋手{item.player}下到位置{item.pos}</button></li>
                        ))}
                        
                    </ul>
                </div>
            )
        }
        
    }
}

export default History;