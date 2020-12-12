import React,{Component} from 'react';


class ErrorBoundary extends Component{
    constructor(props){
        super(props);
        this.state={
            hasError:false
        }
    }

    componentDidCatch(error,info){
        this.setState({
            hasError:true
        });
        console.log("=====出错了========\n",error,info)
    }

    render(){
        const {hasError} = this.state;
        if(hasError){
            return (
                <h1>好像出错了</h1>
            )
        }
        else{
            return this.props.children;
        }

    }
}

export default ErrorBoundary;