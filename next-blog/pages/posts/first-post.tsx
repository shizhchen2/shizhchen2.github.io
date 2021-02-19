import React from 'react'
import {NextPage} from 'next'
import Link from 'next/link'

const FirstPost: NextPage = () => {
    return <div>
        First Post
        <hr/>
        <a href="/"> a 跳转回首页</a>
        <Link href="/"> link 跳转回首页</Link>
    </div>
}

export default FirstPost