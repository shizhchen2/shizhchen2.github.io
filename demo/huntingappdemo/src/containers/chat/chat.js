import {connect} from 'react-redux'
import React, {Component} from 'react'
import {NavBar, List, InputItem,Icon} from 'antd-mobile'
import {sendMsg,readMsg} from '../../redux/action.js'
import QueueAnim from 'rc-queue-anim'
const Item = List.Item
class Chat extends Component {


    state = {
        content:'',
        isShow:false
    }

    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight)
        //发送请求更新消息的未读状态

    }

    componentWillUnmount() {
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from,to)
        // console.log(this.props)
    }


    componentDidUpdate() {
        window.scrollTo(0,document.body.scrollHeight)
    }

    // componentWillMount(){
    //     const emojis = ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊', '😇','🥰','😍','🤩','😘','😗','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨']
    //     this.emojis = emojis.map(emoji=>({text:emoji}))
    // }


    handleSend =()=>{
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()

        if(content){
            this.props.sendMsg({from,to,content})

        }

        this.setState({content:''})
    }



    render(){

        // console.log(this.props)
        const {user} = this.props
        const {users,chatMsgs} = this.props.chat

        const meId = user._id
        if(!users[meId]){
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId,targetId].sort().join('_')
        const msgs =chatMsgs.filter(msg=>msg.chat_id===chatId)

        const targetAvatar = users[targetId].avatar?require(`../../commons/avatars/${users[targetId].avatar}.jpg`):null

        return (

        <div id='chat-page'>
            <NavBar
                icon={<Icon type='left'/>}
                onLeftClick={()=>this.props.history.goBack()}
                className="fixed-header">
                {users[targetId].username}</NavBar>
            <List style={{marginTop:50,marginBottom:50}}>
                <QueueAnim type='left' delay={100}>
                {
                    msgs.map(msg=>{
                        if(meId===msg.to){
                            return <Item
                                key={msg._id}
                                thumb={targetAvatar}
                            >
                                {msg.content}
                            </Item>
                        }else{
                            return <Item
                                key={msg._id}
                                className='chat-me'
                                extra='me'
                            >{msg.content}
                            </Item>
                        }
                    })

                }
                </QueueAnim>
        </List>
            <div className='am-tab-bar'>
                <InputItem
                placeholder="Please enter"
                value={this.state.content}
                onChange = {val=>this.setState({content:val})}
                extra={
                <span onClick={this.handleSend}>Send</span>}
                />
                {/*{this.state.isShow?(<Grid*/}
                {/*    data={this.emojis}*/}
                {/*    columuNum={4}*/}
                {/*    carouselMaxRow={8}*/}
                {/*    isCarousel={true}*/}
                {/*    onClick={(item)=>{*/}
                {/*        this.setState({content:this.state.content+item.text})*/}
                {/*    }}*/}
                {/*/>):null}*/}
            </div>
        </div> )
    } }

export default connect(state=>({user:state.user,chat:state.chat}),{sendMsg,readMsg})(Chat)

