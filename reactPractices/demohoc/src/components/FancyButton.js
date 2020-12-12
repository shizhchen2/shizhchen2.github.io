import React from 'react'
import logProps from './logProps';

class FancyButton extends React.Component{

    sayHi(){
        alert('hello react');
    }

    render(){
        return  (
            <button onClick={this.props.onClick}>fancybutton: {this.props.title}</button>
        )
    }
}

export default logProps(FancyButton)