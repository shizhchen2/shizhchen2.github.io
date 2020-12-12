import React,{Component} from 'react';
import './PlayerInfo.css';
class PlayerInfo extends Component{
    render(){
        const {curPlayer,winResult} = this.props;
        if(winResult.result){
            return (
                <div className="playerInfo">
                棋手：{winResult.winPlayer}-获胜了
            </div>

            )
        }
        return(
            <div className="playerInfo">
                下一位玩家:{curPlayer}
            </div>
        )
    }
}

export default PlayerInfo;