import React from 'react'


const allMsgs = [
    {id:1,title:'message1',content:'asdfasdf'},
    {id:2,title:'message2',content:'123123123'},
    {id:3,title:'message3',content:'xioj123412'},
]

export default function MsgDetail(props){




    const {id}=props.match.params
    const msg = allMsgs.find((m)=>m.id==id)
    return (
        <ul>
            <li>ID:{msg.id}</li>
            <li>TITLE:{msg.title}</li>
            <li>CONTENT:{msg.content}</li>
        </ul>
    )
}