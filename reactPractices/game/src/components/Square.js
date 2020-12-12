import React,{Component} from 'react';
import './Square.css'
class Square extends Component{
    constructor(props){
        super(props)
        this.state={};
    }
    
    getSquareTitle(){
        const {pos,info} = this.props;
        let title=pos;
        if(info){
            title=info;
        }
        return title;
    }
    handleClick=()=>{
        const {pos,info} = this.props;
        if(this.props.onClick){
            this.props.onClick(pos,info)
        }
    }
    render(){
        return (
            <div className="square" onClick={this.handleClick}>
                {this.getSquareTitle()}
            </div>
        )
    }
}
export default Square;