import db from '@/lib/firebase2'

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 10;

    let conversationsRef = db.collection('conversations')
        .orderBy('endTimestamp', 'desc')
        .limit(limit);

    // Calculate the offset for the requested page
    const offset = (page - 1) * limit;

    let conversationsSnapshot;
    if (offset > 0) {
        const lastPageRef = db.collection('conversations')
            .orderBy('endTimestamp', 'desc')
            .limit(offset);

        const lastPageSnapshot = await lastPageRef.get();
        const lastVisible = lastPageSnapshot.docs[lastPageSnapshot.docs.length - 1];

        conversationsRef = conversationsRef.startAfter(lastVisible);
    }

    conversationsSnapshot = await conversationsRef.get();

    const conversations:any = [];
    conversationsSnapshot.forEach(doc => conversations.push({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify({ conversations }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
