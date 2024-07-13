import {db} from '@/lib/firebase2';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const date = searchParams.get('date');
  const agent = searchParams.get('agent');
  const limit = 10;

  let conversationsRef = db.collection('conversations').orderBy('beginTimestamp', 'desc');

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    conversationsRef = conversationsRef
      .where('beginTimestamp', '>=', startOfDay)
      .where('beginTimestamp', '<=', endOfDay);
  }

  if (agent) {
    conversationsRef = conversationsRef.where('agent', '==', agent);
  }

  const snapshot = await conversationsRef.limit((page - 1) * limit + limit).get();
  const conversations = snapshot.docs.slice((page - 1) * limit, page * limit).map(doc => ({ id: doc.id, ...doc.data() }));

  return new Response(JSON.stringify({ conversations }), {
    headers: { 'Content-Type': 'application/json' }
  });
}





// import db from '@/lib/firebase2'

// export async function POST(req: Request) {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get('page') || '1', 10);
//     const date = searchParams.get('date');
//     const agent = searchParams.get('agent');
//     // const minDuration = parseInt(searchParams.get('minDuration') || '0', 10);
//     // const maxDuration = parseInt(searchParams.get('maxDuration') || Number.MAX_SAFE_INTEGER.toString(), 10);
//     const limit = 10;

//     let conversationsRef = db.collection('conversations').orderBy('endTimestamp', 'desc');

//     if (date) {
//         conversationsRef = conversationsRef.where('beginTimestamp', '>=', date);
//     }
//     // if (endTime) {
//     //     conversationsRef = conversationsRef.where('endTimestamp', '<=', endTime);
//     // }
//     if (agent) {
//         conversationsRef = conversationsRef.where('agent', '==', agent);
//     }

//     let filteredConversations:any = [];
//     const snapshot = await conversationsRef.get();
//     snapshot.forEach(doc => {
//         const duration = (doc.data().endTimestamp - doc.data().beginTimestamp);
//         if (duration >= minDuration && duration <= maxDuration) {
//             filteredConversations.push({ id: doc.id, ...doc.data() });
//         }
//     });

//     const start = (page - 1) * limit;
//     const paginatedConversations = filteredConversations.slice(start, start + limit);

//     return new Response(JSON.stringify({ conversations: paginatedConversations }), {
//         headers: { 'Content-Type': 'application/json' }
//     });
// }
