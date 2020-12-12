import React from 'react'
import "chosen-js/chosen.min.css"
import $ from 'jquery'
class Chosen extends React.Component{
    
    componentDidMount(){
        this.$el = window.$(this.el)
        this.$el.chosen({width:"200px"})
        this.handleChange = this.handleChange.bind(this)
        this.$el.on("change",this.handleChange)
    }

    componentDidUpdate(prevProps){
        if(prevProps.children!==this.props.children){
            this.$el.trigger("chosen:updated")
        }

    }

    componentWillUnmount(){
        this.$el.off("change",this.handleChange);
        this.$el.chosen('destroy');
    }

    handleChange(e){
        if(this.props.onChange){
            this.props.onChange(e.target.value) 
        }
        
    }

    render(){
        return (
            <div >
                <select ref={el=>this.el=el} className="Chosen-select">
                    {this.props.children}
                </select>


            </div>
        )
    }
}
export default Chosen;