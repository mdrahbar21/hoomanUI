import db from '@/lib/firebase2'

export async function POST(req: Request) {
    const conversations = db.collection('conversations')
        .orderBy('endTimestamp', 'desc')
        .limit(10);

    const conversation: any = [];
    const snapshot = await conversations.get();
    const last = snapshot.docs[snapshot.docs.length - 1];

    // Collecting data into the array along with the document ID
    snapshot.forEach(doc => conversation.push({ id: doc.id, ...doc.data() }));

    let nextPage: any = [];
    if (last) {
        const next = db.collection('conversations')
            .orderBy('endTimestamp', 'desc')
            .startAfter(last.data().endTimestamp)
            .limit(10);
        const nextSnapshot = await next.get();
        // Collecting data for the next page along with the document ID
        nextSnapshot.forEach(doc => nextPage.push({ id: doc.id, ...doc.data() }));
    }

    // Returning both current and next page conversations
    return new Response(JSON.stringify({ current: conversation, next: nextPage }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
