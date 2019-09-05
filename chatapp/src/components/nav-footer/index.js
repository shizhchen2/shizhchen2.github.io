import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
class NavFooter extends Component{

    static propTypes = {
        navList:PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }


    render(){
        const path = this.props.location.pathname
        let {navList,unReadCount} = this.props
        navList = navList.filter((nav)=>!nav.hide)

        return(
            <TabBar>
                {
                    navList.map((nav)=><TabBar.Item 
                        badge={nav.path==='/messages'?unReadCount:0}
                        key={nav.path}
                        title={nav.text}
                        icon={{uri:require(`../../assets/nav/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`../../assets/nav/${nav.icon}-selected.png`)}}
                        selected={path===nav.path}
                        onPress={()=>this.props.history.replace(nav.path)}
                    ></TabBar.Item>)
                    
                }
                
            </TabBar>
        )
    }
}
export default withRouter(NavFooter)