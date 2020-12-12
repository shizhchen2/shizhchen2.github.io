import React from 'react'

class NameForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            count:0
        }

        setInterval(()=>{
            this.setState((prevState)=>({
                count:prevState.count+1
            }))
        },1000)
    
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.count!==this.state.count){return true}
        
        else{
            return false;
        }
    }
    render(){
        return(
            <div>
                <h1>hello!</h1>
                <div>{this.state.count}</div>
            </div>
        )
    }
}

export default NameForm;