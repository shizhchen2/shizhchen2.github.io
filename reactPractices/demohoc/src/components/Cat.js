import React from 'react'

class Cat extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div style={{height:80,
            width:80,
            borderWidth:1,
            borderStyle:"solid",
            backgroundColor:'red',
            position:"absolute",
            left:this.props.mouse.x?this.props.mouse.x:0,
            top:this.props.mouse.y?this.props.mouse.y:0,
        
            }} >
            </div>
        )
    }
}

export default Cat;