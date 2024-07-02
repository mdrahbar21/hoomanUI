import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase2';

export async function POST(req: Request) {
    // console.log('hello')
    try {
        const querySnapshot = await db.collection('voice').orderBy('createdAt', 'desc').get();
        const data = querySnapshot.docs.map((doc:any) => ({
            id: doc.id,
            ...doc.data()
        }));
        // console.log(data)
        return Response.json({data:data}, {status:200})
        // res.status(200).json({ transcriptions: data });
    } catch (error) {
        console.error('Error fetching transcriptions:', error);
        return Response.json({ error: 'Failed to fetch transcriptions.'}, {status:500})
        // res.status(500).json({ error: 'Failed to fetch transcriptions.' });
    }
}
