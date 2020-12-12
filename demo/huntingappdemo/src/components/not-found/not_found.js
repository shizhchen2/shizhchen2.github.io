import React from 'react'
import {Button} from "antd-mobile";

class NotFound extends React.Component{

    render(){
        return (
            <div>
                <h2>Sorry, can't find this page</h2>
                <Button
                    type="primary"
                    onClick={()=>this.props.history.replace('/')}
                >Back to main page</Button>


            </div>
        )
    }
}

export default NotFound