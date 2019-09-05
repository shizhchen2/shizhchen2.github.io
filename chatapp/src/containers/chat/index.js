import React from 'react'
import {connect} from 'react-redux'
import {InputItem,List,NavBar,Grid,Icon} from 'antd-mobile'
import {sendMsg,readMsg} from '../../redux/actions'
import '../../../public/index.css'
import QueueAnim from 'rc-queue-anim'
class Chat extends React.Component{

    state = {
        content:'',
        show:false
    }
    

    handleSend = ()=>{
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        this.props.sendMsg({from,to,content})
        this.setState({content:'',show:false})
    
    }
    componentDidMount(){
        window.scrollTo(0,document.body.scrollHeight)
        //发请求去更新已读消息
        const from = this.props.match.params.userid
        const to =  this.props.user._id
        this.props.readMsg(from,to)
    }
    componentDidUpdate(){
        window.scrollTo(0,document.body.scrollHeight)
    }
    componentWillUnmount(){
        const from = this.props.match.params.userid
        const to =  this.props.user._id
        this.props.readMsg(from,to)
    }

    
    componentWillMount(){
        const emojis = ['🥺','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺','😚','😙','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','👀','⚡ ','🌚']
        console.log(emojis.length)
        this.emojis = emojis.map((el)=>({
            text:el      
        }))
    }
    toggleShow = ()=>{
        this.setState({
            show:!this.state.show
        })
        if(this.state.show){
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }

    render(){
        const {user} = this.props
        const {users,chatMsgs} = this.props.chat

        const meId = user._id
        if(!users[meId]){
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId,targetId].sort().join('_')

        const msgs = chatMsgs.filter(msg=>msg.chat_id===chatId)
        const targetAvatar = users[targetId].avatar?require(`../../assets/images/${users[targetId].avatar}.png`):null
        return (
            <div id='chat-page'>
                <NavBar 
                icon={<Icon type='left'
                />}
                onLeftClick={()=>this.props.history.goBack()}
                className='sticky-header'>{users[targetId].username}</NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                    <QueueAnim type='left' delay={500}>
                    {
                        msgs.map(msg=>{
                            if(targetId===msg.from){
                                return <List.Item key={msg._id}
                                    thumb={targetAvatar}
                                >
                                    {msg.content}
                                </List.Item>        
                            }else{
                                return <List.Item 
                                    className='chat-me'
                                    extra='我'
                                >
                                    {msg.content}
                                </List.Item> 
                            }
                        })
                    }
                    </QueueAnim>
                </List>


                <div className='am-tab-bar'>
                    <InputItem
                        onChange = {(val)=>this.setState({content:val})}
                        value={this.state.content}
                        placeholder='请输入'
                        onFocus={()=>this.setState({show:false})}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{marginRight:5}}>🥺</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        }
                    />
                    {this.state.show?( <Grid 
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item)=>{
                            this.setState({
                                content:this.state.content+item.text
                            })
                        }}
                    />
                    ):null}
                   
                    

                </div>
            </div>
        )
    }
}

export default connect(state=>({user:state.user,chat:state.chat}),{sendMsg,readMsg})(Chat)
