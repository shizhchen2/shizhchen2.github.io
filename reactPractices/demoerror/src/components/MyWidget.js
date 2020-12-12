import React,{Component} from 'react';
import ErrorBoundary from './ErrorBoundary'

class MyWidget extends Component{

    render(){
        return(
            <ErrorBoundary>
                <div>
                    <h1>MyWidget</h1>
                    <span>asdfasdfasdfa</span>
                    {this.state.asdfasdf}
                </div>
            </ErrorBoundary>
        )

    }
}

export default MyWidget;