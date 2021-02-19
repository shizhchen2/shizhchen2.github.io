import {NextApiHandler} from 'next'

const Demo:NextApiHandler = (req,res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'application/json')
    res.write(JSON.stringify({name:'猪子'}))
    res.end()
}
export default Demo