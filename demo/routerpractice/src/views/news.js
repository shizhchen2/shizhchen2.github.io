import React from 'react'
export default class News extends React.Component {
    state ={
        newsArr:[
            'news1','news2','news3'
        ]
    }

    render() {
        return(
            <ul>
                {
                this.state.newsArr.map((news,index)=>(
                <li key={index}>{news}</li>))
            }
            </ul>
        )
    }
}