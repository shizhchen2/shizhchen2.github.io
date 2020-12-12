import React from 'react'
import withMouse from './withMouse';

class Dog extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div style={{height:80,
            color:"white",
            width:80,
            borderWidth:1,
            borderStyle:"solid",
            backgroundColor:'blue',
            position:"absolute",
            left:this.props.mouse.x?this.props.mouse.x:0,
            top:this.props.mouse.y?this.props.mouse.y:0,
            }} >
            小狗
            </div>
        )
    }
}

export default withMouse(Dog);