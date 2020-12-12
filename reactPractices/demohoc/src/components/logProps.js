import React,{Component} from 'react'

function logProps(WrappedComponent){

    const WrappedComponentName = WrappedComponent.displayName || WrappedComponent.name;
    class logProps extends Component {

        componentDidUpdate(prevProps){
            console.log(WrappedComponentName+' + old props',prevProps);
            console.log(WrappedComponentName+' + new props',this.props)
        }
        render(){
            const { forwardRef,...rest} = this.props
            return <WrappedComponent {...rest} ref={forwardRef} />
        }
    }

    function forwardRef(props,ref){
        return <logProps {...props} forwardRef={ref} />
    }
    return React.forwardRef(forwardRef)
}

export default logProps