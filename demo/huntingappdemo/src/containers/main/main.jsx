import React,{Component} from 'react'
import {Switch,Route,Redirect} from "react-router-dom";
import BossInfo from '../boss-info/boss-info.jsx'
import ApplierInfo from '../applier-info/applier-info.jsx'
//主路由组件

import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/action.js";
import Boss from '../boss/boss.jsx'
import Applier from '../applier/applier.jsx'
import Message from '../message/message.jsx'
import Personal from '../personal/personal.jsx'
import NotFound from '../../components/not-found/not_found.js'
import {NavBar} from "antd-mobile";
import NavFooter from '../../components/nav-footer/nav_footer.jsx'
import Chat from '../chat/chat.js'
class Main extends Component{

    //给组件的对象添加属性
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: 'applier list',
            icon: 'dashen',
            text: 'applier',
        }, {
            path: '/applier', // 路由路径
            component: Applier,
            title: 'boss list',
            icon: 'laoban',
            text: 'boss',
        },
        {
            path: '/message', //
            component: Message,
            title: 'Message list',
            icon: 'message',
            text: 'message',},
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: 'Personal Center',
            icon: 'personal',
            text: 'personal',
        }
    ]


    componentDidMount() {
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid&&!_id){
            //发送异步请求，获取USER
            this.props.getUser()
        }

    }


    render(){


        const userid = Cookies.get('userid')
        if(!userid){
            return <Redirect to='/login' />
        }



        const {user,unReadCount} = this.props
        if(!user._id){
            return null
        }else{
            let path = this.props.location.pathname
            if(path==='/'){
                path = getRedirectTo(user.userType,user.avatar)
                return <Redirect to={path} />
            }
        }
        const {navList} = this

        const path = this.props.location.pathname
        const cur_nav = navList.find(nav=>nav.path===path)
        if(cur_nav){
            if(user.userType==='Boss'){
                navList[1].hide=true
            }else{
                navList[0].hide=true
            }

        }

        return (
            <div>
                {cur_nav?<NavBar className='fixed-header'>{cur_nav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map(nav=><Route path={nav.path} component={nav.component} />)
                    }
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/applierinfo' component={ApplierInfo}></Route>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>

                </Switch>
                {cur_nav?<NavFooter unReadCount={unReadCount} navList={navList} />:null}

            </div>
        )
    }
}


export default connect(state=>({user:state.user,unReadCount:state.chat.unReadCount}),{getUser})(Main)

/*
* 1.componentDidMount()发送请求获取对应的
*2.render
*  a.如果cookie中没有userid，直接重定向到login
*  b.判断redux管理的user中是否有_id，如果没有，暂不显示
*  c.如果有，现实对应界面
*  d.如果请求根路径，根据userType和avatar来计算出一个重定向的路由路径，并自动重定向
*
*
*
*
* */