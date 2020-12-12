import React from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends React.Component{

    static propTypes = {
        setAvatar:PropTypes.func.isRequired
    }

    state = {
        icon:null
    }


    constructor(props){
        super(props)
        this.avatarList=[]
        for(let i =0;i<16;i++){
            this.avatarList.push(
                {
                    text:"avatar "+(i+1),
                    icon:require(`../../commons/avatars/avatar ${i+1}.jpg`)
                }
            )
        }

    }


    handleClick = ({text,icon})=>{
        //update state
        this.setState({icon})
        this.props.setAvatar(text)
        //
    }

    render(){
        const {icon}=this.state
        const listHeader = !icon?'Please select your avatar':<div>
            Choosen:<img src={icon}/>
        </div>

        return (
            <List renderHeader={()=>listHeader}>
                <Grid
                    onClick ={this.handleClick}
                    data={this.avatarList}
                   columnNum={4}
                />
            </List>
        )
    }


}