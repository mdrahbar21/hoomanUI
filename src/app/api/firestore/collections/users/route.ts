import db from '@/lib/firebase2'

export async function POST(req:Request){
    // const data = await req.json()
    const users = db.collection('users')
    const usr:any =[]
    const snapshot = await users.get();
    snapshot.forEach((user)=>{
        usr.push(user)
    })
    console.log(usr)
    // console.log(agents)
    return Response.json( {id:users.id})
}