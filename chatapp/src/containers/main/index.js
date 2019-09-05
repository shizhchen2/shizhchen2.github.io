
import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import EmployeeInfo from '../employeeInfo'
import EmployerInfo from '../employerInfo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import Employee from '../employee'
import Employer from '../employer'
import Personal from '../personal'
import Messages from '../messages'
import NotFound from '../../components/404/index'
import {NavBar} from 'antd-mobile'
import NavFooter from '../../components/nav-footer'
import Chat from '../chat'
import '../../../public/index.css'

class Main extends Component{

    navList = [
        {
            path:'/employer',
            component:Employer,
            title:'求职者列表',
            icon:'dashen',
            text:'求职者'
        },
        {
            path:'/employee',
            component:Employee,
            title:'老板列表',
            icon:'laoban',
            text:'老板'
        },
        {
            path:'/messages',
            component:Messages,
            title:'消息列表',
            icon:'message',
            text:'消息'
        },    
        {
            path:'/personal',
            component:Personal,
            title:'个人中心',
            icon:'personal',
            text:'个人'
        }

    ]


    componentDidMount(){
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id){
            this.props.getUser()
        }
    }

    render(){

        const userid = Cookies.get('userid')
        if(!userid){
            return <Redirect to='/login' />
        }
        //处理根路径
        const {user,unReadCount} = this.props


        if(!user._id){
            return null
        }else{
            let path = this.props.location.pathname
            if(path==='/'){
                path = getRedirectTo(user.type,user.avatar)
                return <Redirect to={path}/>
            }
        }

        
        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find((nav)=>nav.path===path)
        if(currentNav){
            if(user.type==='employer'){
                navList[1].hide = true
            }else{
                navList[0].hide = true
            }
        }
        return (
            <div>
                {currentNav?<NavBar className='sticky-header'>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map(nav=><Route 
                        key={nav.path}
                        path={nav.path} 
                        component={nav.component} />)
                    }
                    <Route path="/employeeInfo"
                    render={props => <EmployeeInfo {...props} />} 
                    />
                    <Route path="/employerInfo"
                    render={props => <EmployerInfo {...props} />} 
                    />
                    <Route path='/chat/:userid'component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav?<NavFooter unReadCount={unReadCount} navList={navList}/>:null}
            </div>
        )
    }
}
export default connect(state=>({user:state.user,unReadCount:state.chat.unReadCount}),{getUser})(Main)