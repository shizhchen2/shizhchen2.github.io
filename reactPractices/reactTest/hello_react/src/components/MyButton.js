import React,{Component} from 'react';


class MyButton extends Component{
    handleClick=()=>{
        const {onClick} = this.props;
        
        if(onClick){
            onClick();
        }

    }
    render(){
        return (
            <button onClick={this.handleClick}>asdfasdfa</button>
        )
    }
}

export default MyButton;