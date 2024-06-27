import db from '@/lib/firebase2';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(req: Request) {
    try {
        const { phoneNum } = await req.json();
        /* when in future we will also have CALL COMPLETION STATUS, then we will query Conversations based on  */
        // Calculate the timestamp for 45 days ago
        const now = new Date();
        const fortyFiveDaysAgo = new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000);
        const fortyFiveDaysAgoTimestamp = Timestamp.fromDate(fortyFiveDaysAgo);
        
        const conversationsRef = db.collection('conversations').orderBy('beginTimestamp', 'desc')
            .where('callConfig.from', '==', phoneNum)
            .where('beginTimestamp', '>=', fortyFiveDaysAgoTimestamp);

        const conversationData: any[] = [];
        const snapshot = await conversationsRef.get();

        snapshot.forEach(doc => {
            const conversation: string[] = [];
            doc.data().transactions.forEach((convo: any) => {
                conversation.push('customer: ' + convo.query);
                conversation.push('agent: ' + convo.response);
            });
            conversationData.push({ id: doc.id, conversation });
        });

        return new Response(JSON.stringify({ conversationData }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
