
import db from '@/lib/firebase2'

export async function POST(req:Request){
    // const data = await req.json()
    const agents = db.collection('agents')
    const agen:any =[]
    const snapshot = await agents.get();
    snapshot.forEach((agent)=>{
        agen.push(agent)
    })

    // console.log(agen)
    // console.log(agents)
    return Response.json(agen)
}