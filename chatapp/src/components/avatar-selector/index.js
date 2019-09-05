import React from 'react'
import {Grid,List} from 'antd-mobile'
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
        for(let i=0;i<20;i++){
            this.avatarList.push({
                text:'头像'+(i+1),
                icon:require(`../../assets/images/头像${i+1}.png`)
            })
        }
    }
    handleClick =({text,icon})=>{
        this.props.setAvatar(text)
        this.setState({
            icon
        })
    }

    render(){
        const listHeader = !this.state.icon?'请选择头像':(<div>已选择头像<img src={this.state.icon}/>
        </div>) 
        
        return(
            <List renderHeader={()=>listHeader}>
                <Grid 
                onClick={this.handleClick}
                data={this.avatarList}
                columnNum={5}
                />
            </List>
        )
    }
}