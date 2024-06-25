import db from '@/lib/firebase2'

export async function POST(req:Request){
    // const data = await req.json()
    const functions = db.collection('functions')
    const func:any =[]
    const snapshot = await functions.get();
    snapshot.forEach((foo)=>{
        func.push(foo)
    })
    console.log(func)
    // console.log(agents)
    return Response.json( {id:functions.id})
}